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

const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const fetchAllCourses = async () => {
    const { data } = await axiosWithCredentials.get(COURSES_API);
    return data;
};

export const createCourse = async (course: any) => {
    const { data } = await axiosWithCredentials.post(COURSES_API, course);
    return data;
};

export const deleteCourse = async (id: string) => {
    const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
    return data;
};

export const updateCourse = async (course: any) => {
    const { data } = await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course);
    return data;
};

export const findModulesForCourse = async (courseId: string) => {
    const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/modules`);
    return response.data;
};

export const createModuleForCourse = async (courseId: string, module: any) => {
    const response = await axiosWithCredentials.post(
        `${COURSES_API}/${courseId}/modules`,
        module
    );
    return response.data;
};

export const findUsersForCourse = async (courseId: string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}/users`);
    return response.data;
};
