import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { useNavigate, useParams } from "react-router";
import "./styles.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function QuizDetails({
  quizDetails,
  fetchQuizDetails,
  attempts,
  setAttempts,
  attemptDetails,
  setAttemptDetails,
}: {
  quizDetails: any;
  fetchQuizDetails: (qzid: string) => void;
  attempts: any[];
  setAttempts: (attempts: any[]) => void;
  attemptDetails: any;
  setAttemptDetails: (attemptDetails: any) => void;
}) {
  const { cid, qzid } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [isLoading, setIsLoading] = useState(true);

  const findAttemptForQuiz = () => {
    const attempt = attempts.find((attempt) => attempt.quizId === qzid);
    if (attempt) {
      setAttemptDetails(attempt);
    } else {
      setAttemptDetails({
        quizId: qzid,
        courseId: cid,
        userId: currentUser?._id,
        attemptNo: 0,
        score: 0,
        answers: [],
      });
    }
  };

  const takeQuizHandler = () => {
    setAttemptDetails({
      ...attemptDetails,
      answers: [],
    });
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${qzid}/Attempt`);
  };

  useEffect(() => {
    const initializeQuiz = async () => {
      setIsLoading(true);
      await fetchQuizDetails(qzid as string);
      findAttemptForQuiz();
      setIsLoading(false);
    };
    initializeQuiz();
  }, [qzid]);

  if (isLoading || !currentUser) {
    return <div>Loading...</div>;
  }

  const isStaff = currentUser?.isStaff || JSON.parse(localStorage.getItem("USER") as string)?.isStaff || false;

  return (
    <div id="wd-quiz-details">
      <div className="w-100 justify-content-center align-self-center row mb-3 ps-5">
        {(isStaff && (
          <div className="col-md-4">
            <Link to={`/Kambaz/Courses/${cid}/Quizzes/${qzid}/Attempt/`}>
              <button
                className="btn btn-secondary me-3"
                onClick={takeQuizHandler}
              >
                Preview
              </button>
            </Link>

            <Link to={`/Kambaz/Courses/${cid}/Quizzes/Editor/${qzid}`}>
              <button className="btn btn-secondary">
                <CiEdit className="me-1" />
                Edit
              </button>
            </Link>
          </div>
        )) || (
          <div className="col-md-4">
            {attemptDetails.attemptNo < quizDetails.maxAttempts && (
              <button className="btn btn-danger me-3" onClick={takeQuizHandler}>
                Take Quiz
              </button>
            )}
            {attemptDetails.attemptNo > 0 && (
              <Link
                to={`/Kambaz/Courses/${cid}/Quizzes/${qzid}/Attempt/Results`}
              >
                <button className="btn btn-secondary">
                  View Latest Results
                </button>
              </Link>
            )}
          </div>
        )}
      </div>
      <hr />
      <div id="wd-quiz-details-section">
        <h1 className="mb-5">{quizDetails.title}</h1>
        <div id="wd-details" className="ms-5 mt-3 mb-5 w-50">
          <div className="row">
            <div className="col-5">
              <b>Quiz Type</b>
            </div>
            <div className="col-7">
              <p>
                {(quizDetails.quizType === "GRADEDQUIZ" && "Graded Quiz") ||
                  (quizDetails.quizType === "PRACTICEQUIZ" &&
                    "Practice Quiz") ||
                  (quizDetails.quizType === "GRADEDSURVEY" &&
                    "Graded Survey") ||
                  (quizDetails.quizType === "UNGRADEDSURVEY" &&
                    "Ungraded Survey")}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-5">
              <b>Points</b>
            </div>
            <div className="col-7">
              <p>{quizDetails.points}</p>
            </div>
          </div>
          <div className="row align-self-right">
            <div className="col-5">
              <b>Assignment Group</b>
            </div>
            <div className="col-7">
              <p>{quizDetails.group}</p>
            </div>
          </div>
          <div className="row align-self-right">
            <div className="col-5">
              <b>Shuffle Answers</b>
            </div>
            <div className="col-7">
              <p>{quizDetails.shuffle ? "Yes" : "No"}</p>
            </div>
          </div>
          <div className="row align-self-right">
            <div className="col-5">
              <b>Time Limit</b>
            </div>
            <div className="col-7">
              <p>
                {quizDetails.hasTimeLimit
                  ? `${quizDetails.timeLimit} Minutes`
                  : "None"}
              </p>
            </div>
          </div>
          <div className="row align-self-right">
            <div className="col-5">
              <b>Multiple Attempts</b>
            </div>
            <div className="col-7">
              <p>{quizDetails.multipleAttempt ? "Yes" : "No"}</p>
            </div>
          </div>
          {quizDetails.multipleAttempt && (
            <div className="row align-self-right">
              <div className="col-5">
                <b>Maximum Attempts</b>
              </div>
              <div className="col-7">
                <p>{quizDetails.maxAttempts}</p>
              </div>
            </div>
          )}
          <div className="row align-self-right">
            <div className="col-5">
              <b>Show Correct Answers</b>
            </div>
            <div className="col-7">
              <p>{quizDetails.showCorrect ? "Yes" : "No"}</p>
            </div>
          </div>
          {quizDetails.accessCode.length > 0 && (
            <div className="row align-self-right">
              <div className="col-5">
                <b>Access Code</b>
              </div>
              <div className="col-7">
                <p>{quizDetails.accessCode}</p>
              </div>
            </div>
          )}
          <div className="row align-self-right">
            <div className="col-5">
              <b>One Question At a Time</b>
            </div>
            <div className="col-7">
              <p>{quizDetails.oneQView ? "Yes" : "No"}</p>
            </div>
          </div>
          <div className="row align-self-right">
            <div className="col-5">
              <b>Lock Questions after answering</b>
            </div>
            <div className="col-7">
              <p>{quizDetails.lockAfterAttempt ? "Yes" : "No"}</p>
            </div>
          </div>
          <div className="row align-self-right">
            <div className="col-5">
              <b>Webcam Required</b>
            </div>
            <div className="col-7">
              <p>{quizDetails.webcamReq ? "Yes" : "No"}</p>
            </div>
          </div>
        </div>
      </div>

      <div id="wd-quiz-date-details-section" className="mt-3 row">
        <div className="col-3">
          <b className="ps-1">Due Date</b>
          <p>{quizDetails.dueDate.split("T")[0]}</p>
        </div>
        <div className="col-3">
          <b className="ps-3">For</b>
          <p>Everyone</p>
        </div>
        <div className="col-3">
          <b>Available From</b>
          <p className="ps-3">{quizDetails.availableFrom.split("T")[0]}</p>
        </div>
        <div className="col-3">
          <b>Available Until</b>
          <p className="ps-3">{quizDetails.availableUntil.split("T")[0]}</p>
        </div>
      </div>

      {/* <table className="table">
        <tr>
          <th scope="col">
            <b>Due</b>
          </th>
          <th scope="col">
            <b>For</b>
          </th>
          <th scope="col">
            <b>Available From</b>
          </th>
          <th scope="col">
            <b>Available Until</b>
          </th>
        </tr>
        <tr>
          <td>{quizDetails.dueDate.split("T")[0]}</td>
          <td>Everyone</td>
          <td>{quizDetails.availableFrom.split("T")[0]}</td>
          <td>{quizDetails.availableUntil.split("T")[0]}</td>
        </tr>
      </table> */}
    </div>
  );
  // ) <div>QuizDetails</div>;
}
