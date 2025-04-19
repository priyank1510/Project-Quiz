import axios from "axios";

// Configure axios defaults
axios.defaults.withCredentials = true;

// Create a custom axios instance with credentials
const axiosWithCredentials = axios.create({ 
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Add request interceptor to handle CORS preflight
axiosWithCredentials.interceptors.request.use(
    config => {
        // Ensure credentials are included in all requests
        config.withCredentials = true;
        return config;
    },
    error => {
        console.error("Request error:", error);
        return Promise.reject(error);
    }
);

// Add response interceptor for handling errors
axiosWithCredentials.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("Response error:", error.response.status, error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("No response received:", error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Error setting up request:", error.message);
        }
        return Promise.reject(error);
    }
);

// Use the production server URL in production
const REMOTE_SERVER = process.env.NODE_ENV === 'production' 
  ? 'https://project-quiz-server.onrender.com' 
  : process.env.REACT_APP_REMOTE_SERVER;

const MODULES_API = `${REMOTE_SERVER}/api/modules`;

export const deleteModule = async (moduleId: string) => {
    const response = await axiosWithCredentials.delete(`${MODULES_API}/${moduleId}`);
    return response.data;
};

export const updateModule = async (module: any) => {
    const { data } = await axiosWithCredentials.put(`${MODULES_API}/${module._id}`, module);
    return data;
};
