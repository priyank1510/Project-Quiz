import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router";
import { useEffect } from "react";
import QuizDetailsEditor from "./QuizDetailsEditor";
import QuizQuestionsEditor from "./Questions/QuizQuestionsEditor";
import QuizEditorNavigation from "./QuizEditorNavigation";
import TrueFalseEditor from "./Questions/TrueFalseEditor";
import MultipleChoiceEditor from "./Questions/MultipleChoiceEditor";
import FillInBlanksEditor from "./Questions/FillInBlanksEditor";
import { Link } from "react-router-dom";

export default function QuizEditor({
  quizDetails,
  setQuizDetails,
  createQuizDetails,
  saveQuizDetails,
  fetchQuizDetails,
}: {
  quizDetails: any;
  setQuizDetails: (quiz: any) => void;
  createQuizDetails: (setPublished: Boolean) => Promise<any>;
  saveQuizDetails: (setPublished: Boolean) => void;
  fetchQuizDetails: (qzid: string) => void;
}) {
  const navigate = useNavigate();
  let { cid, qzid } = useParams();

  console.log(qzid);
  

  const { pathname } = useLocation();


  
  console.log("In quizzes child");

  const isCreate = pathname.includes("create");

  useEffect(() => {
    if (!isCreate) {
      if (!qzid) {
        console.error("Quiz ID is missing");
        return;
      }
      try {
        fetchQuizDetails(qzid as string);
      } catch (error: unknown) {
        console.error("Error fetching quiz details:", error);
      }
    }
  }, []);

  const questions = quizDetails.questions || [];
  const totalPoints = questions.reduce(
    (sum: number, question: any) => sum + question.points,
    0
  );


  const saveAndPublishHandler = async (e: any) => {
    try {
      if (isCreate) {
        qzid = await createQuizDetails(true);
        if (qzid) {
          navigate(`/Kambaz/Courses/${cid}/Quizzes`);
        } else {
          console.error("Failed to create quiz: No quiz ID returned");
        }
      } else {
        if (!qzid) {
          console.error("Cannot save and publish: Quiz ID is missing");
          return;
        }
        await saveQuizDetails(true);
        navigate(`/Kambaz/Courses/${cid}/Quizzes`);
      }
    } catch (error) {
      console.error('Error saving and publishing quiz:', error);
    }
  };

  const saveHandler = async (e: any) => {
    try {
      if (isCreate) {
        qzid = await createQuizDetails(false);
        if (qzid) {
          navigate(`/Kambaz/Courses/${cid}/Quizzes/${qzid}/Details`);
        } else {
          console.error("Failed to create quiz: No quiz ID returned");
        }
      } else {
        if (!qzid) {
          console.error("Cannot save: Quiz ID is missing");
          return;
        }
        await saveQuizDetails(false);
        // Don't navigate away when saving an existing quiz
      }
    } catch (error) {
      console.error('Error saving quiz:', error);
    }
  };

  return (
    <div className="ms-3">
      <div>Points: {totalPoints}</div>
      <hr />
      <QuizEditorNavigation cid={cid as string} qzid={qzid as string} />
      <hr />
      <Routes>
        <Route path="/" element={<Navigate to="Details" />} />
        <Route
          path="Details/"
          element={
            <QuizDetailsEditor
              quizDetails={quizDetails}
              setQuizDetails={setQuizDetails}
            />
          }
        />
        <Route
          path="Questions/"
          element={
            <QuizQuestionsEditor
              quizDetails={quizDetails}
              setQuizDetails={setQuizDetails}
            />
          }
        />
        <Route
          path="Questions/edit/true-false/new"
          element={
            <TrueFalseEditor
              quizDetails={quizDetails}
              setQuizDetails={setQuizDetails}
            />
          }
        />
        <Route
          path="Questions/edit/true-false/:id"
          element={
            <TrueFalseEditor
              quizDetails={quizDetails}
              setQuizDetails={setQuizDetails}
            />
          }
        />
        <Route
          path="Questions/edit/fill-in-blanks/new"
          element={
            <FillInBlanksEditor
              quizDetails={quizDetails}
              setQuizDetails={setQuizDetails}
            />
          }
        />
        <Route
          path="Questions/edit/fill-in-blanks/:id"
          element={
            <FillInBlanksEditor
              quizDetails={quizDetails}
              setQuizDetails={setQuizDetails}
            />
          }
        />
        <Route
          path="Questions/edit/multiple-choice/new"
          element={
            <MultipleChoiceEditor
              quizDetails={quizDetails}
              setQuizDetails={setQuizDetails}
            />
          }
        />
        <Route
          path="Questions/edit/multiple-choice/:id"
          element={
            <MultipleChoiceEditor
              quizDetails={quizDetails}
              setQuizDetails={setQuizDetails}
            />
          }
        />
      </Routes>
      <hr />

      <Link
        to={`/Kambaz/Courses/${cid}/Quizzes`}
        className="btn btn-secondary float-end me-1"
      >
        Cancel
      </Link>

      <button
        className="btn btn-danger float-end me-1"
        onClick={async (e) => {
          await setQuizDetails({ ...quizDetails, published: true });
          saveAndPublishHandler(e);
        }}
      >
        Save and Publish
      </button>

      <button className="btn btn-danger float-end me-1" onClick={saveHandler}>
        Save
      </button>
    </div>
  );
}
