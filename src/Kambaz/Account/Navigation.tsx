import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    // const links = [
    //     { label: "Signin", path: "Signin" },
    //     { label: "Signup", path: "Signup" },
    //     { label: "Profile", path: "Profile" }
    // ];
    const active = (path: string) => (pathname.includes(path) ? "active" : "");
    const links = currentUser ?
        [
            { label: "Profile", path: "Profile" }
        ] :
        [
            { label: "Signin", path: "Signin" },
            { label: "Signup", path: "Signup" }
        ];
    const { pathname } = useLocation();

    return (
        <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
            {links.map((link) => (
                <Link
                    key={link.path}
                    to={`/Kambaz/Account/${link.path}`}
                    className={`list-group-item border-0 ${pathname.includes(link.path)
                        ? "active text-black" : "text-danger"
                        }`}
                >
                    {link.label}
                </Link>
            ))}
            {currentUser && currentUser.role === "ADMIN" && (
                <Link to={`/Kambaz/Account/Users`} className={`list-group-item ${active("Users")}`}> Users </Link>)}
        </div>
    );
}
