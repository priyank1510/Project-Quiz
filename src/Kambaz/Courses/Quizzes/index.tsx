import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useParams } from "react-router-dom";
import * as client from "./client";
import { deleteQuiz, setQuizzes, updateQuiz } from "./reducer";
import QuizDetails from "./QuizDetails";
import QuizEditor from "./QuizEditor";
import QuizList from "./QuizList";
import { useEffect, useState } from "react";
import QuizPreview from "./QuizPreview";

export default function Quizzes() {
  
  
  
    console.log("In quizzes");




  const { cid } = useParams();
  const { currentUser } = useSelector(
    (state: any) => state.accountReducer
  );
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const dispatch = useDispatch();
  const dateToday = new Date();

  const fetchAllQuizzes = async () => {
    const quizzes = await client.fetchQuizzes(cid as string);
    dispatch(setQuizzes(quizzes));
  };

  const updateQuizDetails = async (quiz: any) => {
    await client.updateQuizDetails(cid as string, quiz);
    dispatch(updateQuiz(quiz));
  };

  const deleteQuizDetails = async (quizId: string) => {
    await client.deleteQuiz(cid as string, quizId);
    dispatch(deleteQuiz(quizId));
  };

  const filterQuizzesByName = async (name: string) => {
    if (name) {
      const quizzes = await client.findQuizzesByPartialName(
        cid as string,
        name
      );
      dispatch(setQuizzes(quizzes));
    } else {
      fetchAllQuizzes();
    }
  };

  const defaultQuiz = {
    courseId: cid,
    numQuestions: 0,
    published: false,
    title: "New Quiz title",
    description: "New quiz description",
    quizType: "GRADEDQUIZ",
    points: 0,
    group: "QUIZ",
    shuffle: true,
    hasTimeLimit: true,
    timeLimit: 20,
    multipleAttempt: false,
    maxAttempts: 1,
    showCorrect: false,
    answersDisplayedAt: "IMMEDIATELY",
    accessCode: "",
    oneQView: true,
    webcamReq: false,
    lockAfterAttempt: false,
    dueDate: "2025-05-15",
    availableFrom: "2025-05-01",
    availableUntil: "2025-05-31",
    questions: [],
  };

  const [quizDetails, setQuizDetails] = useState<any>(defaultQuiz);
  const [attempts, setAttempts] = useState<any>([]);

  const resetQuizDetails = () => {
    setQuizDetails(defaultQuiz);
  };

  const fetchQuizDetails = async (qzid: string) => {
    const quiz = await client.fetchQuizDetails(cid as string, qzid);
    setQuizDetails(quiz);
  };

  const createQuizDetails = async (setPublished: Boolean) => {
    const quiz = await client.createQuizDetails(cid as string, {
      ...quizDetails,
      published: setPublished,
    });
    setQuizDetails(quiz);
    return quiz._id;
  };

  const saveQuizDetails = async (setPublished: Boolean) => {
    await client.updateQuizDetails(cid as string, {
      ...quizDetails,
      published: setPublished,
    });
  };

  const [attemptDetails, setAttemptDetails] = useState({
    quizId: "",
    courseId: cid,
    userId: currentUser._id,
    attemptNo: 0,
    score: 0,
    answers: [],
  });

  const fetchAllAttemptDetails = async () => {
    const attempts = await client.fetchAllAttempts(
      currentUser._id,
      // quizDetails._id
      quizDetails.courseId
    );
    setAttempts(attempts);
  };  

  return (
    <div id="wd-quizzes">
      <Routes>
        <Route
          path="/"
          element={
            <QuizList
              isStaff={currentUser?.isStaff || JSON.parse(localStorage.getItem("USER") as string)?.isStaff || false}
              quizzes={quizzes}
              attempts={attempts}
              fetchAllQuizzes={fetchAllQuizzes}
              updateQuizDetails={updateQuizDetails}
              deleteQuizDetails={deleteQuizDetails}
              filterQuizzesByName={filterQuizzesByName}
              quizDetails={quizDetails}
              resetQuizDetails={resetQuizDetails}
              fetchAllAttemptDetails={fetchAllAttemptDetails}
            />
          }
        />
         <Route
          path="/Editor/:qzid/*"
          element={
            <QuizEditor
              quizDetails={quizDetails}
              setQuizDetails={setQuizDetails}
              createQuizDetails={createQuizDetails}
              saveQuizDetails={saveQuizDetails}
              fetchQuizDetails={fetchQuizDetails}
            />
          }
        />


        

        <Route
          path="/:qzid/Details/*"
          element={
            <QuizDetails
              quizDetails={quizDetails}
              fetchQuizDetails={fetchQuizDetails}
              attempts={attempts}
              setAttempts={setAttempts}
              attemptDetails={attemptDetails}
              setAttemptDetails={setAttemptDetails}
            />
          }
        />
        

        <Route
          path="/:qzid/Attempt/*"
          element={
            <QuizPreview
              quizDetails={quizDetails}
              attempts={attempts}
              setAttempts={setAttempts}
              attemptDetails={attemptDetails}
              setAttemptDetails={setAttemptDetails}
            />
          }
        />
      </Routes>
    </div>
  );
}
