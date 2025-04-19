import { FaPlus, FaRocket } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import * as client from "./client";
import { addQuiz, deleteQuiz, setQuizzes, updateQuiz } from "./reducer";
import { TiArrowSortedDown } from "react-icons/ti";
import { useEffect } from "react";
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical, IoRocketOutline } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import QuizControls from "./QuizControls";
import { CiSearch } from "react-icons/ci";

export default function QuizList({
  isStaff,
  quizzes,
  quizDetails,
  attempts,
  fetchAllQuizzes,
  updateQuizDetails,
  deleteQuizDetails,
  filterQuizzesByName,
  resetQuizDetails,
  fetchAllAttemptDetails,
}: {
  isStaff: boolean;
  quizzes: any;
  quizDetails: any;
  attempts: any[];
  fetchAllQuizzes: () => void;
  updateQuizDetails: (quiz: any) => void;
  deleteQuizDetails: (quizId: string) => void;
  filterQuizzesByName: (name: string) => void;
  resetQuizDetails: () => void;
  fetchAllAttemptDetails: () => void;
}) {
  const { cid } = useParams();
  const dateToday = new Date();

  useEffect(() => {
    fetchAllQuizzes();
    resetQuizDetails();
    fetchAllAttemptDetails();
  }, []);
  const questions = quizDetails.questions || [];

  const quizAttempted = (quizId: string) => {
    const attempt = attempts.find((attempt) => attempt.quizId === quizId);
    return attempt;
  };  

  return (
    <div id="wd-quizzes">
      {isStaff && (
        <div id="wd-quizzes-control" className="text-nowrap mb-3 row">
          <div className="col-10 justify-content-center">
            <div className="col-5 search-wrapper ms-3">
              <div className="icon">
                <CiSearch />
              </div>
              <input
                className=" col form-control text-center search-bar"
                placeholder="Search Quizzes"
                onChange={(e) => filterQuizzesByName(e.target.value)}
              ></input>
            </div>
          </div>
          <Link
            to={`/Kambaz/Courses/${cid}/Quizzes/Editor/create`}
            className="text-decoration-none col-2 justify-content-center"
          >
            <button className="btn btn-danger">
              <FaPlus
                className="position-relative me-2"
                style={{ bottom: "1px" }}
              />
              Quiz
            </button>
          </Link>
        </div>
      )}
      <hr />

      <ul className="wd-assignments list-group rounded-0 mt-10">
        <li className="wd-asmnts-title list-item p-0">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <TiArrowSortedDown className="me-2 fs-3" />
            Quizzes
          </div>
        </li>
        {quizzes &&
          quizzes.map(
            (quiz: any) =>
              (isStaff || quiz.published) && (
                <li className="wd-asmnt list-item p-3">
                  <div className="row">
                    <div className="col-1 justify-content-center align-self-center text-center h4">
                      <IoRocketOutline className="text-success" />
                    </div>
                    <div className="col-8">
                      <div>
                        <Link
                          to={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/Details`}
                          className="text-decoration-none text-danger"
                        >
                          <b>{quiz.title}</b>
                        </Link>
                      </div>
                      <div>
                        <span>
                          <b>
                            {(quiz.availableFrom &&
                              quiz.availableUntil &&
                              dateToday <
                                new Date(quiz.availableFrom.split("T")[0]) &&
                              `Not Available Until ${
                                quiz.availableFrom.split("T")[0]
                              } `) ||
                              (quiz.availableUntil &&
                                dateToday >
                                  new Date(quiz.availableUntil.split("T")[0]) &&
                                "Closed ") ||
                              "Available "}
                          </b>
                        </span>{" "}
                        |{" "}
                        <span>
                          Due {quiz.dueDate && quiz.dueDate.split("T")[0]}
                        </span>{" "}
                        | {quiz.points}
                        {" Pt(s)"} | {quiz.numQuestions}
                        {" Question(s)"}{" "}
                        {!isStaff && quizAttempted(quiz._id) && (
                          <span>| Score: {quizAttempted(quiz._id).score}</span>
                        )}
                      </div>
                    </div>
                    {isStaff && (
                      <div className="col-3 justify-content-center align-self-center">
                        <QuizControls
                          quiz={quiz}
                          updateQuizDetails={updateQuizDetails}
                          deleteQuizDetails={deleteQuizDetails}
                        />
                      </div>
                    )}
                  </div>
                </li>
              )
          )}
      </ul>
    </div>
  );
}
