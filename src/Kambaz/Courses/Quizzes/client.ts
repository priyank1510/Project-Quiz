import axios from "axios";

// Configure axios defaults
axios.defaults.withCredentials = true;

const REMOTE_SERVER = process.env.NODE_ENV === 'production' 
  ? 'https://project-quiz-server.onrender.com' 
  : process.env.REACT_APP_REMOTE_SERVER;

// Add a request interceptor to handle CORS preflight
axios.interceptors.request.use(
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

// Add a response interceptor to handle CORS errors
axios.interceptors.response.use(
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

const QUIZ_API = `${REMOTE_SERVER}/api/quizzes`;
const QUIZ_ATTEMPTS_API = `${REMOTE_SERVER}/api/quizattempts`;
const QUESTION_API = `${REMOTE_SERVER}/api/questions`;

export const fetchQuizDetails = async (courseId: string, quizId: string) => {
  try {
    if (!courseId || !quizId) {
      console.error("Missing courseId or quizId");
      throw new Error("Missing courseId or quizId");
    }
    const { data } = await axios.get(`${QUIZ_API}/${courseId}/${quizId}`);
    return data;
  } catch (error) {
    console.error("Error fetching quiz details:", error);
    throw error;
  }
};

export const createQuizDetails = async (courseId: string, quiz: any) => {
  // Ensure the quiz object has the correct structure
  const quizToSend = {
    ...quiz,
    courseId: courseId,
    // Ensure these fields are properly formatted
    multipleAttempt: Boolean(quiz.multipleAttempt),
    maxAttempts: quiz.multipleAttempt ? Number(quiz.maxAttempts) : 1,
    hasTimeLimit: Boolean(quiz.hasTimeLimit),
    timeLimit: quiz.hasTimeLimit ? Number(quiz.timeLimit) : 0,
    shuffle: Boolean(quiz.shuffle),
    showCorrect: Boolean(quiz.showCorrect),
    oneQView: Boolean(quiz.oneQView),
    webcamReq: Boolean(quiz.webcamReq),
    lockAfterAttempt: Boolean(quiz.lockAfterAttempt),
    points: Number(quiz.points) || 0,
    numQuestions: Number(quiz.questions?.length) || 0
  };
  
  try {
    const { data } = await axios.post(`${QUIZ_API}/${courseId}`, quizToSend);
    return data;
  } catch (error) {
    console.error("Error creating quiz:", error);
    throw error;
  }
};

export const updateQuizDetails = async (courseId: string, quiz: any) => {
  try {
    if (!courseId || !quiz || !quiz._id) {
      console.error("Missing courseId or quiz ID");
      throw new Error("Missing courseId or quiz ID");
    }
    
    // Format the quiz data similar to createQuizDetails
    const quizToSend = {
      ...quiz,
      courseId: courseId,
      multipleAttempt: Boolean(quiz.multipleAttempt),
      maxAttempts: quiz.multipleAttempt ? Number(quiz.maxAttempts) : 1,
      hasTimeLimit: Boolean(quiz.hasTimeLimit),
      timeLimit: quiz.hasTimeLimit ? Number(quiz.timeLimit) : 0,
      shuffle: Boolean(quiz.shuffle),
      showCorrect: Boolean(quiz.showCorrect),
      oneQView: Boolean(quiz.oneQView),
      webcamReq: Boolean(quiz.webcamReq),
      lockAfterAttempt: Boolean(quiz.lockAfterAttempt),
      points: Number(quiz.points) || 0,
      numQuestions: Number(quiz.questions?.length) || 0
    };

    console.log('Updating quiz:', { courseId, quizId: quiz._id });
    const { data } = await axios.put(`${QUIZ_API}/${courseId}/${quiz._id}`, quizToSend);
    console.log('Quiz update successful:', data);
    return data;
  } catch (error) {
    console.error('Error updating quiz:', error);
    if (axios.isAxiosError(error)) {
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
    }
    throw error;
  }
};

export const deleteQuiz = async (courseId: string, quizId: string) => {
  try {
    if (!courseId || !quizId) {
      console.error("Missing courseId or quizId");
      throw new Error("Missing courseId or quizId");
    }
    const { data } = await axios.delete(`${QUIZ_API}/${courseId}/${quizId}`);
    return data;
  } catch (error) {
    console.error("Error deleting quiz:", error);
    throw error;
  }
};

export const fetchQuizzes = async (courseId: string) => {
  const { data } = await axios.get(`${QUIZ_API}/${courseId}`);
  return data;
};

export const findQuizzesByPartialName = async (
  courseId: string,
  name: string
) => {
  const { data } = await axios.get(`${QUIZ_API}/${courseId}/search/${name}`);
  return data;
};
export const findQuestionById = async (id: string) => {
  const { data } = await axios.get(`${QUESTION_API}/${id}`);
  return data;
};

export const recordAttempt = async (attempt: any) => {
  const { data } = await axios.post(`${QUIZ_ATTEMPTS_API}`, attempt);
  return data;
};

export const fetchAttempt = async (
  userId: string,
  courseId: string,
  quizId: string
) => {
  const { data } = await axios.get(
    `${QUIZ_ATTEMPTS_API}/${userId}/${courseId}/${quizId}`
  );
  return data;
};

export const updateAttempt = async (attempt: any) => {
  const { data } = await axios.put(
    `${QUIZ_ATTEMPTS_API}/${attempt._id}`,
    attempt
  );
  return data;
};

export const fetchAllAttempts = async (userId: string, courseId: string) => {
  const { data } = await axios.get(
    `${QUIZ_ATTEMPTS_API}/user/${userId}/${courseId}`
  );
  return data;
};
