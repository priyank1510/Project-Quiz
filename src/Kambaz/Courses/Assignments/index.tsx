import { BsGripVertical, BsPlusLg } from "react-icons/bs";
import AssignmentHeaderControlButtons from "./AssignmentHeaderControlButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { FaBook } from "react-icons/fa6";
import { useParams } from "react-router";
import ProtectedContent from "../../Account/ProtectedContent";
import { useDispatch, useSelector } from "react-redux";
import { IoIosSearch } from "react-icons/io";
import { deleteAssignment, setAssignments } from "./reducer";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import * as client from "./client";
export default function Assignments() {
    const { cid } = useParams();
    
    const {assignments} = useSelector((state: any) => state.assignmentReducer);
    const dispatch = useDispatch();
    const fetchAssignments = async () => {
        const assignments = await client.findAssignmentsForCourse(cid as string);
        dispatch(setAssignments(assignments));
    }

    const removeAssignment = async (assignmentId: string) => {
        await client.deleteAssignment(assignmentId);
        dispatch(deleteAssignment(assignmentId));
    };

    useEffect(()=>{
        fetchAssignments();
      },[]);

    const handleDeleteAssignment = (assignmentId: string) => {
        const confirmed = window.confirm("Confirm that you want to delete this assignment");
        if (confirmed) {
            removeAssignment(assignmentId);
        }
    };


    

    return (
        <div>
            <ProtectedContent allowedRoles={["FACULTY"]}>
                <div id="assignment-controls" className="text-nowrap mb-3 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <IoIosSearch size={24} />
                        <input id="wd-search-assignment" className="form-control me-2" placeholder="Search..." />
                    </div>
                    <div className="wd-assignment-btn float-end d-none d-xl-block">
                        <button className="wd-add-assignment-group btn btn-lg btn-secondary me-1 rounded-2">
                            <BsPlusLg /> Group
                        </button>
                        <Link to={`/kambaz/Courses/${cid}/Assignments/New`}
                            className="wd-add-assignment btn btn-lg btn-danger text-white rounded-2">
                            <BsPlusLg /> Assignment
                        </Link>
                    </div>
                </div>
            </ProtectedContent>
            <br /><br />
            <ul id="wd-assignments" className="list-group rounded-0">
                <li className="wd-assignment-bar list-group-item p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" />
                        ASSIGNMENTS
                        <ProtectedContent allowedRoles={["FACULTY"]}>
                            <AssignmentHeaderControlButtons />
                        </ProtectedContent>
                        <div className="wd-weightage float-end">
                            <span className="wd-weight border-gray p-2 rounded-5 me-2 fs-5">40% of Total</span>
                        </div>
                    </div>
                    <ul className="wd-assignment-list list-group rounded-0">
                        {assignments.map((assignment: any) => (
                                <li key={assignment._id} className="wd-assignment-list-item list-group-item p-3 ps-1">
                                    <BsGripVertical className="me-2 fs-3" />
                                    <span className="float-left text-success me-2">  <FaBook /></span>
                                    <a className="wd-assignment-link text-black text-decoration-none ps-1"
                                        href={`#/kambaz/Courses/${cid}/Assignments/${assignment._id}`}>
                                        {assignment.title}
                                    </a>
                                    <ProtectedContent allowedRoles={["FACULTY"]}>
                                    <AssignmentControlButtons
                                        assignmentId={assignment._id}
                                        onDelete={handleDeleteAssignment}
                                    /></ProtectedContent>
                                    <div className="wd-assignment-details ms-5">
                                        <span className="wd-module-type text-danger">
                                            Multiple Modules
                                        </span> |
                                        <span className="wd-start-date">
                                            <b>Not available until</b> {assignment.available_from_date} at 12:00 am
                                        </span> |
                                        <span className="wd-end-date">
                                            <b> Due</b> {assignment.due_date} at 11:59 pm
                                        </span> |
                                        <span className="wd-points">
                                            {assignment.points} pts
                                        </span>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </li>
            </ul>
        </div>
    );
}