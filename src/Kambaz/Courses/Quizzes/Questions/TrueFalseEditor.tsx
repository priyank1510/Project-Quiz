import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Editor from "react-simple-wysiwyg";
import { fetchQuizDetails } from "../client";

const initialState = {
  title: "",
  points: 0,
  question: "",
  answer: false,
};

export default function TrueFalseEditor({
  quizDetails,
  setQuizDetails,
}: {
  quizDetails: any;
  setQuizDetails: (quiz: any) => void;
}) {
  const { cid, qzid, id } = useParams();
  const [formState, setFormState] = useState(initialState);
  const navigate = useNavigate();
  const questions = quizDetails.questions || [];

  useEffect(() => {
    const fetchQuestion = async () => {
      if (id) {
        let existingQuestion = questions.find((q: any) => q.id === id);
        if (!existingQuestion) {
          const quiz = await fetchQuizDetails(cid as string, qzid as string);
          existingQuestion = quiz.questions.find((q: any) => q.id === id);
        } else {
          setFormState({
            ...existingQuestion,
            nextId: existingQuestion.choices?.length + 1 || 1,
          });
        }
      }
    };
    fetchQuestion();
  }, [id, questions, cid, qzid]);

  const handleFieldChange = (field: any, value: any) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleAnswer = (checked: any) => {
    setFormState((prevState) => ({
      ...prevState,
      answer: checked,
    }));
  };

  const handleSave = () => {
    const newQuestionId = new Date().getTime().toString();
    const questionData = {
      id: id || newQuestionId,
      type: "true-false",
      title: formState.title,
      points: formState.points,
      question: formState.question,
      answer: formState.answer,
    };
    const updatedQuestions = id
      ? questions.map((q: any) => (q.id === id ? questionData : q))
      : [...questions, questionData];

    setQuizDetails({
      ...quizDetails,
      questions: updatedQuestions,
      numQuestions: updatedQuestions.length,
      points: updatedQuestions.reduce(
        (acc: number, q: any) => acc + q.points,
        0
      ),
    });
    navigate(`/Kambaz/Courses/${cid}/Quizzes/Editor/${qzid}/Questions`);
  };

  return (
    <div>
      <h2>True/False Question Editor</h2>
      <div>
        <label>
          Title
          <input
            type="text"
            className="form-control"
            value={formState.title}
            onChange={(e) => handleFieldChange("title", e.target.value)}
            placeholder="Enter question title..."
          />
        </label>
      </div>
      <br />
      <div>
        <label>
          Points
          <input
            type="number"
            className="form-control"
            value={formState.points}
            onChange={(e) =>
              handleFieldChange("points", Number(e.target.value))
            }
            placeholder="Enter points..."
          />
        </label>
      </div>
      <br />
      <div>
        <label>
          Question
          <Editor
            value={formState.question}
            onChange={(e) => handleFieldChange('question', e.target.value)}
          />
        </label>
      </div>
      <br />
      <div>
        <label>
          Correct Answer
          <div className="form-check">
            <input
              type="radio"
              id="trueOption"
              name="answer"
              checked={formState.answer}
              onChange={() => handleAnswer(true)}
              className="form-check-input"
            />
            <label htmlFor="trueOption" className="form-check-label">
              True
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              id="falseOption"
              name="answer"
              checked={!formState.answer}
              onChange={() => handleAnswer(false)}
              className="form-check-input"
            />
            <label htmlFor="falseOption" className="form-check-label">
              False
            </label>
          </div>
        </label>
      </div>
      <hr />
      <div>
        <button className="btn btn-danger me-3" onClick={handleSave}>
          Save/Update Question
        </button>
        <Link
          className="btn btn-secondary"
          to={`/Kambaz/Courses/${cid}/Quizzes/Editor/${qzid}/Questions`}
        >
          Cancel
        </Link>
      </div>
    </div>
  );
}
