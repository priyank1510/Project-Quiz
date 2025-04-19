import { useLocation } from "react-router";
import { Link } from "react-router-dom";

export default function QuizEditorNavigation({
  cid,
  qzid,
}: {
  cid: string;
  qzid: string;
}) {
  const { pathname } = useLocation();
  return (
    <ul className="nav nav-pills">
      <li className="nav-item">
        <Link
          id="wd-quiz-details-link"
          to={`/Kambaz/Courses/${cid}/Quizzes/Editor/${qzid}/Details`}
          className="nav-link text-decoration-none text-danger"
        >
          Details
        </Link>
      </li>
      <li className="nav-item ">
        <Link
          id="wd-quiz-questions-link"
          to={`/Kambaz/Courses/${cid}/Quizzes/Editor/${qzid}/Questions`}
          className="nav-link text-decoration-none text-danger"
        >
          Questions
        </Link>
      </li>
    </ul>
  );
}
