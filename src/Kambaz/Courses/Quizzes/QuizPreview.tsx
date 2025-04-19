import { useSelector } from "react-redux";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { Link } from "react-router-dom";
import QuizQuestion from "./QuizQuestion";
import { useEffect, useState } from "react";
import * as client from "./client";
import ScoreDisplay from "./ScoreDisplay";

export default function QuizPreview({
  quizDetails,
  attempts,
  setAttempts,
  attemptDetails,
  setAttemptDetails,
}: {
  quizDetails: any;
  attempts: any[];
  setAttempts: (attempts: any[]) => void;
  attemptDetails: any;
  setAttemptDetails: (attemptDetails: any) => void;
}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { cid, qzid } = useParams();
  const { currentUser } = useSelector(
    (state: any) => state.accountReducer
  );
  const [currentQuestionIndex, setCurrentIndex] = useState(0);
  const questions = quizDetails.questions || [];

  const { state } = useLocation();
  const submitQuizHandler = async () => {
    const givenAnswers = attemptDetails.answers;
    let score = 0;

    // console.log("Questions:", questions);
    // console.log("Given Answers:", givenAnswers);

    givenAnswers.map((answer: any) => {
      const question = questions.find(
        (question: any) => question.id === answer.qid
      );

      // console.log(`Question for answer ${answer.qid}:`, question);

      // if (!question) {
      //   console.warn(`Question with id ${answer.qid} not found`);
      //   return;
      // }

      if (question.type === "true-false") {
        if (`${question.answer}` === answer.answer) {
          score += question.points;
        }
      } else if (question.type === "multiple-choice") {
        question.choices.map((choice: any) => {
          if (choice.isCorrect && choice.id === parseInt(answer.answer)) {
            score += question.points;
          }
        });
      } else {
        const givenAnswers = answer.answer;
        let allCorrect = true;
        givenAnswers.map((givenAnswer: any) => {
          const blank = question.blanks.find(
            (blank: any) => blank.id === parseInt(givenAnswer.blankId)
          );
          if (blank.text !== givenAnswer.answer) {
            allCorrect = false;
            // score += question.points;
          }
        });
        if (allCorrect) {
          score += question.points;
        }
      }
    });

    setAttemptDetails({
      ...attemptDetails,
      attemptNo: attemptDetails.attemptNo + 1,
      score: score,
    });

    if (attemptDetails.attemptNo === 0) {
      submitAttempt({
        ...attemptDetails,
        score: score,
      });
    } else {
      updateAttempt({
        ...attemptDetails,
        score: score,
      });
    }
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${qzid}/Attempt/Results`);
  };

  const fetchAttemptDetails = async () => {
    const attempt = await client.fetchAttempt(
      currentUser._id,
      cid as string,
      qzid as string
    );

    if (attempt) {
      setAttemptDetails(attempt);
      if (!currentUser?.isStaff && attempt.attemptNo === quizDetails.maxAttempts) {
        navigate(`/Kambaz/Courses/${cid}/Quizzes/${qzid}/Attempt/Results`);
      }
    }
  };

  const submitAttempt = async (thisAttempt: any) => {
    const attempt = await client.recordAttempt({
      ...thisAttempt,
      attemptNo: attemptDetails.attemptNo + 1,
    });
    setAttemptDetails(attempt);
  };

  const updateAttempt = async (thisAttempt: any) => {
    const attempt = await client.updateAttempt({
      ...thisAttempt,
      attemptNo: attemptDetails.attemptNo + 1,
    });
  };

  // useEffect(() => {
  //   fetchAttemptDetails();
  // }, []);

  const handleNoQuestion = () => {
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${qzid}/Details`);
  };

  if (questions.length === 0) {
    return (
      <div className="alert alert-danger">
        There are no questions to preview. Please add questions or return to the
        quiz details.
        <br />
        <br />
        <button className="btn btn-danger" onClick={handleNoQuestion}>
          GO BACK
        </button>
      </div>
    );
  }

  return (
    <div id="wd-quiz-questions" className="clearfix">
      <Routes>
        <Route
          path="/"
          element={
            <Navigate to={`Question/${questions[0].id}`} state={state} />
          }
        ></Route>
        <Route
          path="Question/:qid/*"
          element={
            <QuizQuestion
              quizDetails={quizDetails}
              questions={questions}
              attemptDetails={attemptDetails}
              setAttemptDetails={setAttemptDetails}
              currentQuestionIndex={currentQuestionIndex}
              setCurrentIndex={setCurrentIndex}
              state={state}
            />
          }
        />
        <Route
          path="Results"
          element={
            <ScoreDisplay
              quizDetails={quizDetails}
              attemptDetails={attemptDetails}
              setAttemptDetails={setAttemptDetails}
            />
          }
        />
      </Routes>
      {(!pathname.includes("Results") && (state ? !state.viewAnswer : true) && (
        <div>
          <div className="row mb-4">
            <div className="col-7"></div>
            <div className="mt-3 d-flex flex-row-reverse">
              <button
                className="btn px-5 py-2 btn-danger "
                onClick={submitQuizHandler}
              >
                SUBMIT
              </button>
            </div>
          </div>
          <hr />
          <h6>Questions</h6>
          <ul className="list-group">
            {questions.map((question: any, index: number) => {
              return (
                <li className="list-group-item border-none w-25">
                  <RxQuestionMarkCircled className="me-1" />
                  <Link
                    to={`/Kambaz/Courses/${cid}/Quizzes/${qzid}/Attempt/Question/${question.id}`}
                    state={state}
                    className="text-decoration-none text-danger"
                  >
                    Question {index + 1}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )) ||
        (state && state.viewAnswer && (
          <Link
            to={`/Kambaz/Courses/${cid}/Quizzes/`}
            className="text-decoration-none mt-3 float-end"
          >
            <button className="btn btn-lg btn-danger">Home</button>
          </Link>
        ))}
    </div>
  );
}
