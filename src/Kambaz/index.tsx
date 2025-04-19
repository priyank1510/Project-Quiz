import "./styles.css";
import Account from "./Account";
import Dashboard from "./Dashboard/Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
// import * as db from "./Database";
import { Route, Routes, Navigate } from "react-router";
import { useState, useEffect } from "react";
import store from "./store";
import { Provider, useSelector } from "react-redux";
import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";

export default function Kambaz() {
    // const [courses, setCourses] = useState<any[]>(db.courses);
    const [courses, setCourses] = useState<any[]>([]);
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const [enrolling, setEnrolling] = useState<boolean>(false);
    const findCoursesForUser = async () => {
        if (!currentUser) {
            console.log("No user logged in");
            setCourses([]);
            return;
        }
        try {
            const enrolledCourses = await userClient.findCoursesForUser(currentUser._id);
            if (!enrolledCourses || enrolledCourses.length === 0) {
                setCourses([]);
                return;
            }
            // Make sure each course has the enrolled property set to true
            const coursesWithEnrollment = enrolledCourses.map((course: any) => ({
                ...course,
                enrolled: true
            }));
            setCourses(coursesWithEnrollment);
        } catch (error: any) {
            console.error("Error fetching courses:", error.response?.data || error.message);
            if (error.response?.status === 401) {
                console.log("User not authenticated");
            }
            setCourses([]);
        }
    };

    const updateEnrollment = async (courseId: string, enrolled: boolean) => {
        if (enrolled) {
            await userClient.enrollIntoCourse(currentUser._id, courseId);
        } else {
            await userClient.unenrollFromCourse(currentUser._id, courseId);
        }
        setCourses(
            courses.map((course) => {
                if (course._id === courseId) {
                    return { ...course, enrolled: enrolled };
                } else {
                    return course;
                }
            })
        );
    };

    const fetchCourses = async () => {
        try {
            const allCourses = await courseClient.fetchAllCourses();
            if (!currentUser) {
                setCourses(allCourses);
                return;
            }
            const enrolledCourses = await userClient.findCoursesForUser(
                currentUser._id
            );
            const courses = allCourses.map((course: any) => {
                if (enrolledCourses && enrolledCourses.find((c: any) => c && c._id === course._id)) {
                    return { ...course, enrolled: true };
                } else {
                    return { ...course, enrolled: false };
                }
            });
            setCourses(courses);
        } catch (error) {
            console.error(error);
            // Set courses to empty array in case of error to prevent rendering issues
            setCourses([]);
        }
    };

    // const fetchCourses = async () => {
    //     let courses = [];
    //     try {
    //         courses = await userClient.findMyCourses();
    //     } catch (error) {
    //         console.error(error);
    //     }
    //     setCourses(courses);
    // };

    // const fetchCourses = async () => {
    //     try {
    //         const courses = await courseClient.fetchAllCourses();
    //         setCourses(courses);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // useEffect(() => {
    //     fetchCourses();
    // }, [currentUser]);

    useEffect(() => {
        if (!currentUser) {
            // If no user is logged in, fetch all courses without enrollment info
            fetchCourses();
            return;
        }
        if (enrolling) {
            fetchCourses();
        } else {
            findCoursesForUser();
        }
    }, [currentUser, enrolling]);

    const [course, setCourse] = useState<any>({
        _id: "1234", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
    });
    // const addNewCourse = () => {
    //     setCourses([...courses, { ...course, _id: new Date().getTime().toString() }]);
    // };

    // const addNewCourse = async () => {
    //     const newCourse = await userClient.createCourse(course);
    //     setCourses([...courses, newCourse]);
    // };

    const addNewCourse = async () => {
        const newCourse = await courseClient.createCourse(course);
        setCourses([...courses, newCourse]);
    };

    // const deleteCourse = (courseId: any) => {
    //     setCourses(courses.filter((course) => course._id !== courseId));
    // };
    const deleteCourse = async (courseId: string) => {
        const status = await courseClient.deleteCourse(courseId);
        setCourses(courses.filter((course) => course._id !== courseId));
    };
    // const updateCourse = () => {
    //     setCourses(
    //         courses.map((c) => {
    //             if (c._id === course._id) {
    //                 return course;
    //             } else {
    //                 return c;
    //             }
    //         })
    //     );
    // };
    const updateCourse = async () => {
        await courseClient.updateCourse(course);
        setCourses(courses.map((c) => {
            if (c._id === course._id) { return course; }
            else { return c; }
        })
        );
    };

    return (
        <Provider store={store}>
            <Session>
                <div id="wd-Kambaz">
                    <KambazNavigation />
                    <div className="wd-main-content-offset p-3">
                        <Routes>
                            <Route path="/" element={<Navigate to="Account" />} />
                            <Route path="/Account/*" element={<Account />} />
                            <Route path="/Dashboard" element={
                                <ProtectedRoute>
                                    <Dashboard
                                        courses={courses}
                                        course={course}
                                        setCourse={setCourse}
                                        addNewCourse={addNewCourse}
                                        deleteCourse={deleteCourse}
                                        updateCourse={updateCourse}
                                        enrolling={enrolling}
                                        setEnrolling={setEnrolling}
                                        updateEnrollment={updateEnrollment}
                                    />
                                </ProtectedRoute>
                            } />
                            <Route path="/Courses/:cid/*" element={
                                <ProtectedRoute>
                                    <Courses courses={courses} />
                                </ProtectedRoute>} />
                            <Route path="/Calendar" element={<h1>Calendar</h1>} />
                            <Route path="/Inbox" element={<h1>Inbox</h1>} />
                        </Routes>
                    </div>
                </div>
            </Session>
        </Provider>
    );
}
