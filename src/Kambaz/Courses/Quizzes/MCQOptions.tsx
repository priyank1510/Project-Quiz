export default function MCQOptions({
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
  const prevAnswerValue = currentAnswer ? currentAnswer.answer : "";
  const viewAnswer = state ? state.viewAnswer : false;
  const choices = question.choices;
  const handleClick = (event: any) => {
    const currentAnswer = event.target.id;
    const newAnswer = {
      qid: question.id,
      answer: currentAnswer,
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
  return (
    <div className="ms-3 mb-3 me-3">
      {choices.map((choice: any) => (
        <div  className={`form-check mb-1`}
        key={choice.id}>
          <input
            type="radio"
            id={choice.id}
            name="answer"
            className="form-check-input mb-1"
            onClick={handleClick}
            checked={parseInt(prevAnswerValue) === choice.id}
            disabled={viewAnswer}
          />
          <label
            htmlFor={choice.id}
            className={`${
              viewAnswer &&
              ((choice.isCorrect && "text-success fw-bold") ||
                (parseInt(prevAnswerValue) === choice.id &&
                  "text-danger font-weight-bold"))
            }`}
          >
            {choice.text}
          </label>
          <hr />
        </div>
      ))}
    </div>
  );
}
