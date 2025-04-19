import { Link, useLocation, useParams } from "react-router-dom";
import "./index.css"

export default function CoursesNavigation() {
    const links = [
        { label: "Home", path: "Home" },
        { label: "Modules", path: "Modules" },
        { label: "Piazza", path: "Piazza" },
        { label: "Zoom", path: "Zoom" },
        { label: "Assignments", path: "Assignments" },
        { label: "Quizzes", path: "Quizzes" },
        { label: "Grades", path: "Grades" },
        { label: "People", path: "People" }
    ];

    const { pathname } = useLocation();
    const { cid } = useParams();
    return (
        <div id="wd-courses-navigation" className="list-group fs-5 rounded-0">
            {links.map((link) => (
                <Link
                    key={link.path}
                    to={`/Kambaz/Courses/${cid}/${link.path}`}
                    className={`list-group-item border-0 
                        ${pathname.includes(link.path) ? "active text-black" : "text-danger"}`}
                >
                {link.label}
                </Link>
            ))}
        </div>
    );
}
