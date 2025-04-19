import { useEffect, useState } from "react";

export default function BlanksOptions({
  question,
  attemptDetails,
  setAttemptDetails,
  currentAnswer,
  state,
}: {
  question: any;
  attemptDetails: any;
  setAttemptDetails: (attempt: any) => void;
  currentAnswer: any;
  state: any;
}) {
  const prevAnswerValue = currentAnswer ? currentAnswer.answer : [];
  const viewAnswer = state ? state.viewAnswer : false;
  const blanks = question.blanks;
  const [newAnswerSet, setNewAnswerSet] = useState<any>([]);

  useEffect(() => {
    setNewAnswerSet(prevAnswerValue);
  }, []);

  const onChangeHandler = (event: any) => {
    const answer = event.target.value;
    const blankId = event.target.id;
    const newBlankAnswer = {
      blankId: blankId,
      answer: answer,
    };

    const index = newAnswerSet.findIndex(
      (blank: any) => blank.blankId === blankId
    );

    let newAnswers = [...newAnswerSet];

    if (index !== -1) {
      newAnswers[index] = newBlankAnswer;
    } else {
      newAnswers.push(newBlankAnswer);
    }
    setNewAnswerSet(newAnswers);

    const newAnswer = {
      qid: question.id,
      answer: newAnswers,
    };

    const allAnswers = attemptDetails.answers;
    const prevAttempt = allAnswers.find(
      (answer: any) => answer.qid === question.id
    );

    let updatedAnswers = [];
    if (prevAttempt) {
      updatedAnswers = allAnswers.map((answer: any) => {
        if (answer.qid === question.id) {
          return newAnswer;
        }
        return answer;
      });
    } else {
      updatedAnswers = [...allAnswers, newAnswer];
    }

    setAttemptDetails({
      ...attemptDetails,
      answers: updatedAnswers,
    });
  };

  const getGivenAnswerForBlank = (blankId: any) => {
    const answer =
      Array.isArray(prevAnswerValue) &&
      prevAnswerValue.find(
        (answer: any) => answer.blankId === blankId.toString()
      );
    return answer ? answer.answer : "";
  };

  const getCorrectAnswerForBlank = (blankId: any) => {
    const answer = question.blanks.find((blank: any) => blank.id === blankId);
    return answer ? answer.text : "";
  };

  return (
    <div className="ms-3 mb-3 me-3">
      {blanks.map((blank: any) => (
        <div className="row">
          <div className="col form-blank mb-1" key={blank.id}>
            <label htmlFor={blank.id}>{blank.id}</label>
            <input
              type="text"
              id={blank.id}
              name="answer"
              className="form-blank-input mb-3 ms-3 p-2"
              onChange={onChangeHandler}
              disabled={viewAnswer}
              placeholder="Enter your answer..."
            />
          </div>
          <div
            className={`mb-3 ms-3 p-2 col ${
              getGivenAnswerForBlank(blank.id) ===
              getCorrectAnswerForBlank(blank.id)
                ? "text-success"
                : "text-danger"
            }`}
            id="wd-given-answer"
          >
            {viewAnswer && <p>Answered: {getGivenAnswerForBlank(blank.id)}</p>}
          </div>
          <div className={`mb-3 ms-3 p-2 col`} id="wd-correct-answer">
            {viewAnswer && (
              <p className="text-muted">
                Correct Answer: {getCorrectAnswerForBlank(blank.id)}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
