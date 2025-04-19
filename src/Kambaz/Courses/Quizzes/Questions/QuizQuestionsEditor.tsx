import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { FaTrash } from 'react-icons/fa6';

export default function QuizQuestionsEditor({
  quizDetails,
  setQuizDetails,
}:{
  quizDetails: any;
  setQuizDetails: (quiz:any) => void;
}) {
  const [newQuestionType, setNewQuestionType] = useState('multiple-choice');
  const questions = quizDetails.questions || [];
  const navigate = useNavigate();

  const handleAddQuestion = () => {
    navigate(`./edit/${newQuestionType}/new`);
  };

  const handleEditQuestion = (id: string) => {
    const question = questions.find((q: any) => q.id === id);
    if (question) {
      const path = `./edit/${question.type}/${id}`;
      navigate(path);
    }
  };

  const handleDeleteQuestion = (id: string) => {
    const updatedQuestions = questions.filter((q: any) => q.id !== id);
    setQuizDetails({ ...quizDetails, questions: updatedQuestions });
  };

  const totalQuestions = questions.length;
  return (
    <div>
      <div><h2>QUESTIONS EDITOR</h2>
        <span className='float-end'>
          <label className='me-3'> Questions: {totalQuestions}</label>
        </span>
      </div>

      <div className='d-flex mb-3'>
        <select
          className='form-select w-25 me-2'
          value={newQuestionType}
          onChange={(e) => setNewQuestionType(e.target.value)}
        >
          <option value="true-false">True/False</option>
          <option value="multiple-choice">Multiple Choice</option>
          <option value="fill-in-blanks">Fill in the Blanks</option>
        </select>
        <button className='btn btn-lg btn-secondary' onClick={handleAddQuestion}>Create Question</button>
      </div>
      <hr />
      {questions.map((question: any, index: number) => (
        <div key={question.id} className="question">
          <p>Type: {question.type} <span className='float-end'>Points: {question.points}</span></p>
          <FaTrash onClick={() => handleDeleteQuestion(question.id)} className='float-end text-danger' />
          <p>Q{index + 1}: {question.question}</p>
          {question.type === 'multiple-choice' && question.choices && (
            <ul className='list-group'>
              {question.choices.map((choice: any) => (
                <li key={choice.id} className='list-group-item w-25' style={{ color: choice.isCorrect ? 'green' : 'black' }}>
                  {choice.text}
                </li>
              ))}
            </ul>
          )}

          {question.type === 'true-false' && (
            <ul className='list-group'>
              <li className='list-group-item w-25' style={{ color: question.answer === true ? 'green' : 'black' }}>True</li>
              <li className='list-group-item w-25' style={{ color: question.answer === false ? 'green' : 'black' }}>False</li>
            </ul>
          )}

          {question.type === 'fill-in-blanks' && question.blanks && (
            <ul className='list-group'>
              {question.blanks.map((blank: any) => (
                <li key={blank.id} className='list-group-item w-25'>
                  {blank.text}
                </li>
              ))}
            </ul>
          )}

          <button className='btn btn-secondary mt-2' onClick={() => handleEditQuestion(question.id)}>Edit</button>
          <hr />
        </div>
      ))}
    </div>
  );
}
