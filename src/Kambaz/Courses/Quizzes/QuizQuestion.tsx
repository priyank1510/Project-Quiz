import { useLocation, useNavigate, useParams } from "react-router";
import TFOptions from "./TFOptions";
import MCQOptions from "./MCQOptions";
import { useEffect, useState } from "react";
import BlanksOptions from "./BlanksOptions";

export default function QuizQuestion({
  quizDetails,
  questions,
  attemptDetails,
  setAttemptDetails,
  currentQuestionIndex,
  setCurrentIndex,
  state,
}: {
  quizDetails: any;
  questions: any[];
  attemptDetails: any;
  setAttemptDetails: (attempt: any) => void;
  currentQuestionIndex: number;
  setCurrentIndex: (index: number) => void;
  state: any;
}) {
  const { qid } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(() => {
    return questions.find((q: any) => q.id === qid) || {};
  });

  useEffect(() => {
    const newQuestion = questions.find((q: any) => q.id === qid);
    if (newQuestion) {
      setQuestion(newQuestion);
    }
  }, [qid, questions]);

  const currentIndex = questions.findIndex((q) => q.id === qid);
  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      const nextQuestionId = questions[currentIndex + 1].id;
      navigate(`../Question/${nextQuestionId}`, { state });
    }
  };

  const currentAnswer = attemptDetails.answers.filter(
    (answer: any) => answer.qid === qid
  )[0];
  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      const prevQuestionId = questions[currentIndex - 1].id;
      navigate(`../Question/${prevQuestionId}`, { state });
    }
  };

  return (
    <div>
      <h2 className="mb-3">{quizDetails.title}</h2>

      <h5>{quizDetails.description}</h5>
      <hr />

      <h3>{question.title}</h3>
      <div
        className=" border border-dark mb-4 rounded-3"
        //  style={{ minHeight: "35vh", maxHeight: "35vh" }}
      >
        <div className="d-flex p-3 rounded-top-3 justify-content-between bg-secondary border-bottom border-dark">
          <div>
            <h3> Question {currentIndex + 1}</h3>
          </div>
          <div>
            <h5 className="mt-2">{question.points + " pts"}</h5>
          </div>
        </div>
        <div className="p-3 mt-2 border-bottom mb-4">{question.question}</div>
        {(question.type === "true-false" && (
          <TFOptions
            question={question}
            attemptDetails={attemptDetails}
            setAttemptDetails={setAttemptDetails}
            currentAnswer={currentAnswer}
            state={state}
          />
        )) ||
          (question.type === "multiple-choice" && (
            <MCQOptions
              question={question}
              attemptDetails={attemptDetails}
              setAttemptDetails={setAttemptDetails}
              currentAnswer={currentAnswer}
              state={state}
            />
          )) ||
          (question.type === "fill-in-blanks" && (
            <BlanksOptions
              question={question}
              attemptDetails={attemptDetails}
              setAttemptDetails={setAttemptDetails}
              currentAnswer={currentAnswer}
              state={state}
            />
          ))}
      </div>
      <button className="btn px-4 btn-secondary" onClick={handlePrevQuestion}>
        PREV
      </button>
      <button
        className="btn btn-secondary px-4 float-end"
        onClick={handleNextQuestion}
      >
        NEXT
      </button>
    </div>
  );
}
