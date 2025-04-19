import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const USERS_API = `${REMOTE_SERVER}/api/users`;

export const enrollCourse = async (userId: string, courseId: string) => {
    const response = await axiosWithCredentials.post(
        `${REMOTE_SERVER}/api/courses/${courseId}/enroll`
    );
    return response.data;
};

export const unenrollCourse = async (userId: string, courseId: string) => {
    const response = await axiosWithCredentials.delete(
        `${REMOTE_SERVER}/api/courses/${courseId}/enroll`
    );
    return response.data;
};

export const getUserEnrollments = async (userId: string) => {
    const response = await axiosWithCredentials.get(
        `${REMOTE_SERVER}/api/users/${userId}/enrollments`
    );
    return response.data;
};

export const getAllCourses = async () => {
    const response = await axiosWithCredentials.get(`${REMOTE_SERVER}/api/courses`);
    return response.data;
};