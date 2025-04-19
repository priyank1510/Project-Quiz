import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateAssignment, addAssignment } from "./reducer";
import { useState } from "react";
import ProtectedContent from "../../Account/ProtectedContent";
import * as client from "./client";

export default function AssignmentEditor() {
  const {  aid, cid } = useParams();
  const navigate = useNavigate();
  const assignments = useSelector((state: any) => state.assignmentReducer.assignments);
  const dispatch = useDispatch();



  const createAssignment = async (assignment: any) => {
    const newAssignment = await client.createAssignment(cid as string, assignment);
    dispatch(addAssignment(newAssignment));
};

const saveAssignment = async (assignment: any) => {
    await client.updateAssignment(assignment);
    dispatch(updateAssignment(assignment));
};




  const assignment = assignments ? assignments.find((assignment: any) => assignment._id === aid) : null;

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isReadOnly = currentUser.role === "STUDENT";

  const [formState, setFormState] = useState({
    title: assignment?.title || "",
    description: assignment?.description || "",
    points: assignment?.points || "",
    due_date: assignment?.due_date || "",
    available_from_date: assignment?.available_from_date || "",
    available_until_date: assignment?.available_until_date || "",
    gradeType: assignment?.gradeType || "Percentage",
    submissiontype: assignment?.submissionType || "Online",
    entry: assignment?.entry || "File Uploads",
    display_grade: assignment?.display_grade || "Percentage",
    Assignmentgroup: assignment?.Assignmentgroup || "ASSIGNMENTS",
  });



  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setFormState({
      ...formState,
      [id]: value,
    });
  };

  const handleSave = () => {
    if (assignment) {
      const updateAssignment = {
        ...assignment,
        ...formState,
      }
      saveAssignment(updateAssignment);
      alert("Saved!");
    } else {
      const newAssignment = {
        ...formState,
        course: cid,
        _id: new Date().getTime().toString(),
      };
      createAssignment(newAssignment);
      alert("Added");
    }
    navigate(`/kambaz/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure?")) {
      navigate(`/kambaz/Courses/${cid}/Assignments`);
    }
  };






  return (
    <Container>
      <div id="wd-assignments-editor">
        <form action="#" className="assignment-editor" style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <br />
          <input id="title" className="form-control  w-100" value={formState.title} onChange={handleChange} readOnly={isReadOnly} />
          <br />
          <textarea id="description" className="form-control w-100" rows={10} value={formState.description} onChange={handleChange} readOnly={isReadOnly} />
          <br />
          <Form.Group as={Row} className="mb-3" controlId="formPoints">
            <Form.Label column sm="2">
              Points
            </Form.Label>
            <Col sm="10">
              <Form.Control type="number" id="points" value={formState.points} onChange={handleChange} readOnly={isReadOnly} className="w-100" />
            </Col>
          </Form.Group>
          <ProtectedContent allowedRoles={["FACULTY"]}>
            <Form.Group as={Row} className="mb-3" controlId="formAssignmentGroup">
              <Form.Label column sm="2">
                Assignment Group
              </Form.Label>
              <Col sm="10">
                <Form.Select id="Assignmentgroup" className="w-100" value={formState.Assignmentgroup} onChange={handleChange}>
                  <option>ASSIGNMENTS</option>
                  <option>QUIZZES</option>
                  <option>PROJECTS</option>
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formDisplayGrade">
              <Form.Label column sm="2">
                Display Grade as
              </Form.Label>
              <Col sm="10">
                <Form.Select id="display_grade" className="w-100" value={formState.display_grade} onChange={handleChange}>
                  <option>Percentage</option>
                  <option>Points</option>
                  <option>Complete/Incomplete</option>
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Submission Type
              </Form.Label>
              <Col sm="10">
                <div className="p-3 mt-3 border rounded">
                  <Form.Select id="submissiontype" className="w-100" value={formState.submissiontype} onChange={handleChange}>
                    <option>Online</option>
                    <option>On Paper</option>
                    <option>No Submission</option>
                  </Form.Select>
                </div>
              </Col>
            </Form.Group>
          </ProtectedContent>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Assign</Form.Label>
            <Col sm="10">
              <div className="p-3 border rounded">
                <ProtectedContent allowedRoles={["FACULTY"]}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Assign to</Form.Label>
                    <div className="d-flex align-items-center p-2 border rounded">
                      <div className="bg-light text-grey rounded-square p-2"> Everyone
                        <FaTimes className="ms-2 cursor-pointer" />
                      </div>
                    </div>
                  </Form.Group>
                </ProtectedContent>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Due</Form.Label>
                  <Form.Control type="date" id="due_date" value={formState.due_date} onChange={handleChange} readOnly={isReadOnly} className="w-100" />
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Col sm="6">
                    <Form.Label className="fw-bold">Available from</Form.Label>
                    <Form.Control type="date" id="available_from_date" value={formState.available_from_date} onChange={handleChange} readOnly={isReadOnly} className="w-100" />
                  </Col>
                  <Col sm="6">
                    <Form.Label className="fw-bold">Until</Form.Label>
                    <Form.Control type="date" id="available_until_date" value={formState.available_until_date} onChange={handleChange} readOnly={isReadOnly} className="w-100" />
                  </Col>
                </Form.Group>
              </div>
            </Col>
          </Form.Group>
          <ProtectedContent allowedRoles={["FACULTY"]}>
            <Form.Group as={Row} className="mb-3">
              <div className="d-flex justify-content-end mt-3">
                <Button variant="light" className="me-2" onClick={handleCancel}>Cancel</Button>
                <Button variant="danger" onClick={handleSave}>Save</Button>
              </div>
            </Form.Group>
          </ProtectedContent>
        </form>
      </div>
    </Container>
  );
}