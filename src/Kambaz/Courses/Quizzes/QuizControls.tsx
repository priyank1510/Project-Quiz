import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { BsBan, BsCheckCircleFill } from "react-icons/bs";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link, useParams } from "react-router-dom";

export default function QuizControls({
  quiz,
  updateQuizDetails,
  deleteQuizDetails,
}: {
  quiz: any;
  updateQuizDetails: (quiz: any) => void;
  deleteQuizDetails: (quiz: any) => void;
}) {
  const [anchorElement, setAnchorElement] = useState(null);
  const { cid } = useParams();
  const clickPublishHandler = () => {
    updateQuizDetails({ ...quiz, published: !quiz.published });
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  const handleDotsClick = (e: any) => {
    setAnchorElement(e.currentTarget);
  };

  return (
    <div className="float-end">
      <button className="btn" onClick={clickPublishHandler}>
        {quiz.published ? (
          <BsCheckCircleFill className="text-success" />
        ) : (
          <BsBan className="text-danger" />
        )}
      </button>
      <button className="btn">
        <IoEllipsisVertical
          className="ms-3 me-1 fs-4"
          onClick={handleDotsClick}
        />
      </button>
      <Menu
        keepMounted
        anchorEl={anchorElement}
        onClose={handleClose}
        open={Boolean(anchorElement)}
      >
        <MenuItem onClick={handleClose}>
          <Link
            to={`/Kambaz/Courses/${cid}/Quizzes/Editor/${quiz._id}/`}
            className="text-danger text-decoration-none"
          >
            Edit
          </Link>
        </MenuItem>
        <MenuItem
          onClick={(e: any) => {
            deleteQuizDetails(quiz._id);
            handleClose();
          }}
          className="text-danger"
        >
          Delete
        </MenuItem>
        <MenuItem
          onClick={(e: any) => {
            updateQuizDetails({ ...quiz, published: !quiz.published });
            handleClose();
          }}
          className={quiz.published ? "text-danger" : "text-success"}
        >
          {quiz.published ? "Unpublish" : "Publish"}
        </MenuItem>
      </Menu>
    </div>
  );
}
