import { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnRedo, BtnStrikeThrough, BtnStyles, BtnUnderline, BtnUndo, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg';
export default function QuizDetailsEditor({
  quizDetails,
  setQuizDetails,
}: {
  quizDetails: any;
  setQuizDetails: (quiz: any) => void;
}) {

  const questions = quizDetails.questions || [];
  const totalPoints = questions.reduce(
    (sum: number, question: any) => sum + question.points,
    0
  );

  useEffect(() => {
    setQuizDetails({ ...quizDetails, points: totalPoints });
  }, [questions, quizDetails, setQuizDetails, totalPoints]);
  
  return (
    <div id="wd-quiz-details-editor ms-5">
      <input
        className="form-control mb-3 w-50"
        id="wd-quiz-title"
        value={quizDetails.title}
        onChange={(e) =>
          setQuizDetails({ ...quizDetails, title: e.target.value })
        }
      />
      <label htmlFor="wd-quiz-description">Quiz Instructions</label>
   
        <EditorProvider>
        <Editor
        id="wd-quiz-description"
            value={quizDetails.description}
            onChange={(e: any) => setQuizDetails({...quizDetails,description: e.target.value})}
          >
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
    

      <hr />
      <h5> Quiz Attributes</h5>
      <div className="row form-group w-75 mb-3 mt-3">
        <div className="col-3">
          <label htmlFor="wd-type" className="form-label">
            Quiz Type
          </label>
        </div>
        <select
          id="wd-group"
          className="form-select col"
          onChange={(e) =>
            setQuizDetails({ ...quizDetails, quizType: e.target.value })
          }
        >
          <option value="GRADEDQUIZ">Graded Quiz</option>
          <option value="PRACTICEQUIZ">Practice Quiz</option>
          <option value="GRADEDSURVEY">Graded Survey</option>
          <option value="UNGRADEDSURVEY">Ungraded Survey</option>
        </select>
        <div className="col-5"></div>
      </div>

      <div className="row form-group w-75 mb-3 mt-3">
        <div className="col-3">
          <label htmlFor="wd-group" className="form-label">
            Assignment Group
          </label>
        </div>
        <select
          id="wd-group"
          className="form-select col"
          onChange={(e) =>
            setQuizDetails({ ...quizDetails, group: e.target.value })
          }
        >
          <option value="QUIZ">Quiz</option>
          <option value="ASSIGNMENT">Assignment</option>
          <option value="EXAM">Exam</option>
          <option value="PROJECT">Project</option>
        </select>
        <div className="col-5"></div>
      </div>

      <div className="row form-group w-75 mb-3 mt-3">
        <div className="col-3">
          <label className="form-label">Access Code</label>
        </div>
        <input
          type="text"
          className="col form-control w-50"
          value={quizDetails.accessCode}
          onChange={(e) =>
            setQuizDetails({ ...quizDetails, accessCode: e.target.value })
          }
        />
        <div className="col-5"></div>
      </div>

      <hr />

      <div className="row w-75 mt-3">
        <h5 className="col-3"> Quiz Options </h5>
        <div className="col border rounded">
          <div className="form-check mb-2 mt-2">
            <input
              className="form-check-input"
              type="checkbox"
              id="wd-shuffle-answers"
              defaultChecked={quizDetails.shuffle}
              onChange={(e) => {
                setQuizDetails({ ...quizDetails, shuffle: e.target.checked });
              }}
            />
            <label className="form-check-label" htmlFor="wd-shuffle-answers">
              Shuffle Answers
            </label>
          </div>

          <div className="mb-2 mt-2">
            <div className="">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="wd-time-limit"
                  defaultChecked={quizDetails.hasTimeLimit}
                  onChange={(e) => {
                    setQuizDetails({
                      ...quizDetails,
                      hasTimeLimit: e.target.checked,
                    });
                  }}
                />
                <label className="form-check-label" htmlFor="wd-time-limit">
                  Time Limit
                </label>
              </div>
            </div>
          </div>
          {quizDetails.hasTimeLimit && (
            <div className="mb-2 mt-2">
              {" "}
              <div className="col">
                {" "}
                <input
                  type="number"
                  className="form-control"
                  id="wd-time-limit"
                  placeholder="Time Limit (in minutes)"
                  value={quizDetails.timeLimit}
                  onChange={(e) =>
                    setQuizDetails({
                      ...quizDetails,
                      timeLimit: parseInt(e.target.value),
                    })
                  }
                />{" "}
              </div>{" "}
            </div>
          )}

          <div className="form-check mb-2 mt-2">
            <input
              className="form-check-input"
              type="checkbox"
              id="wd-multiple-attempts"
              defaultChecked={quizDetails.multipleAttempt}
              onChange={(e) => {
                setQuizDetails({
                  ...quizDetails,
                  multipleAttempt: e.target.checked,
                });
              }}
            />
            <label className="form-check-label" htmlFor="wd-multiple-attempts">
              Allow Multiple Attempts
            </label>
          </div>

          {quizDetails.multipleAttempt && (
            <div className="col mt-2 mb-2">
              <div className="">
                <input
                  type="number"
                  className="form-control"
                  id="wd-max-attempts"
                  placeholder="Max Attempts"
                  value={quizDetails.maxAttempts}
                  onChange={(e) =>
                    setQuizDetails({
                      ...quizDetails,
                      maxAttempts: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          )}
          <div className="form-check mb-2 mt-2">
            <input
              className="form-check-input"
              type="checkbox"
              id="wd-show-correct"
              defaultChecked={quizDetails.showCorrect}
              onChange={(e) => {
                setQuizDetails({
                  ...quizDetails,
                  showCorrect: e.target.checked,
                });
              }}
            />
            <label className="form-check-label" htmlFor="wd-show-correct">
              Show Correct Answers
            </label>
          </div>
          {quizDetails.showCorrect && (
            <div className="row mb-2 mt-2">
              <div className="col">
                <label htmlFor="wd-type" className="form-label align-middle">
                  Answers Displayed:
                </label>
              </div>
              <select
                id="wd-answer-display-time"
                className="form-select col"
                onChange={(e) =>
                  setQuizDetails({
                    ...quizDetails,
                    answersDisplayedAt: e.target.value,
                  })
                }
              >
                <option value="IMMEDIATELY">Immediately</option>
                <option value="ONCLOSE">On Quiz Close</option>
              </select>
            </div>
          )}
          <div className="form-check mb-2 mt-2">
            <input
              className="form-check-input"
              type="checkbox"
              id="wd-one-question-view"
              defaultChecked={quizDetails.oneQView}
              onChange={(e) => {
                setQuizDetails({ ...quizDetails, oneQView: e.target.checked });
              }}
            />
            <label className="form-check-label" htmlFor="wd-one-question-view">
              One Question View
            </label>
          </div>

          <div className="form-check mb-2 mt-2">
            <input
              className="form-check-input"
              type="checkbox"
              id="wd-webcam-required"
              defaultChecked={quizDetails.webcamReq}
              onChange={(e) => {
                setQuizDetails({ ...quizDetails, webcamReq: e.target.checked });
              }}
            />
            <label className="form-check-label" htmlFor="wd-webcam-required">
              Webcam Required
            </label>
          </div>

          <div className="form-check mb-2 mt-2">
            <input
              className="form-check-input"
              type="checkbox"
              id="wd-lock-after-attempt"
              defaultChecked={quizDetails.lockAfterAttempt}
              onChange={(e) => {
                setQuizDetails({
                  ...quizDetails,
                  lockAfterAttempt: e.target.checked,
                });
              }}
            />
            <label className="form-check-label" htmlFor="wd-lock-after-attempt">
              Lock After Attempt
            </label>
          </div>
        </div>
        <div className="col-2"></div>
      </div>
      <hr />

      <div className="row w-75 mt-3">
        <h5 className="col-3">Quiz Dates</h5>
        <div className="col border rounded">
          <div className="mt-2 ms-1">
            <label className="form-label">Due Date</label>
          </div>

          <div className="mb-3">
            <input
              type="date"
              className="form-control"
              value={quizDetails.dueDate && quizDetails.dueDate.split("T")[0]}
              onChange={(e) =>
                setQuizDetails({ ...quizDetails, dueDate: e.target.value })
              }
            />
          </div>

          <div className="row">
            <div className="col">
              <div className="mt-3 ms-1">
                <label className="form-label">Available From</label>
              </div>

              <div className="mb-3">
                <input
                  type="date"
                  className="form-control"
                  value={
                    quizDetails.availableFrom &&
                    quizDetails.availableFrom.split("T")[0]
                  }
                  onChange={(e) =>
                    setQuizDetails({
                      ...quizDetails,
                      availableFrom: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="col">
              <div className="mt-3 ms-1">
                <label className="form-label">Available Until</label>
              </div>

              <div className="mb-3">
                <input
                  type="date"
                  className="form-control"
                  value={
                    quizDetails.availableUntil &&
                    quizDetails.availableUntil.split("T")[0]
                  }
                  onChange={(e) =>
                    setQuizDetails({
                      ...quizDetails,
                      availableUntil: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
}
