import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  Editor,
  EditorProvider,
  HtmlButton,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { fetchQuizDetails } from "../client";

const initialState = {
  title: "",
  points: 0,
  question: "",
  choices: [{ id: 1, text: "", isCorrect: false }],
  nextId: 2,
  type: "multiple-choice",
};

export default function MultipleChoiceEditor({
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

  const addChoice = () => {
    setFormState((prevState) => ({
      ...prevState,
      choices: [
        ...prevState.choices,
        { id: prevState.nextId, text: "", isCorrect: false },
      ],
      nextId: prevState.nextId + 1,
    }));
  };

  const removeChoice = (choiceId: number) => {
    setFormState((prevState) => ({
      ...prevState,
      choices: prevState.choices.filter((choice) => choice.id !== choiceId),
    }));
  };

  const handleChoiceTextChange = (choiceId: number, text: string) => {
    setFormState((prevState) => ({
      ...prevState,
      choices: prevState.choices.map((choice) =>
        choice.id === choiceId ? { ...choice, text } : choice
      ),
    }));
  };

  const handleCorrectChoiceChange = (choiceId: number) => {
    setFormState((prevState) => ({
      ...prevState,
      choices: prevState.choices.map((choice) => ({
        ...choice,
        isCorrect: choice.id === choiceId,
      })),
    }));
  };

  const handleFieldChange = (field: string, value: any) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSave = () => {
    const questionData = {
      id: id || new Date().getTime().toString(),
      title: formState.title,
      points: formState.points,
      question: formState.question,
      choices: formState.choices,
      type: formState.type,
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
      <h2>Multiple Choice Question Editor</h2>
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
      <div>
        <br />
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
          <EditorProvider>
            <Editor value={formState.question}
              onChange={(e) => handleFieldChange('question', e.target.value)} >
              <Toolbar>
                <BtnUndo />
                <BtnRedo />
                <Separator />
                <BtnBold />
                <BtnItalic />
                <BtnUnderline />
                <BtnStrikeThrough />
                <Separator />
                <BtnNumberedList />
                <BtnBulletList />
                <Separator />
                <BtnLink />
                <BtnClearFormatting />
                <HtmlButton />
                <Separator />
                <BtnStyles />
              </Toolbar>

            </Editor>
          </EditorProvider>
        </label>
      </div>
      <br />
      <div>
        <label className="mb-1">Choices</label>
        {formState.choices.map((choice) => (
          <div key={choice.id} className="d-flex mb-3">
            <input
              type="radio"
              className="me-3"
              name="wd-mcq-choice-radio"
              checked={choice.isCorrect}
              onChange={() => handleCorrectChoiceChange(choice.id)}
            />
            <textarea
              value={choice.text}
              name="wd-mcq-choice-input"
              className="form-control w-25 me-3"
              onChange={(e) =>
                handleChoiceTextChange(choice.id, e.target.value)
              }
              placeholder="Enter choice text here..."
            />
            <button
              className="btn btn-secondary h-100"
              onClick={() => removeChoice(choice.id)}
            >
              Remove
            </button>
          </div>
        ))}
        <br />
        <button className="btn btn-secondary" onClick={addChoice}>
          Add Choice
        </button>
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
