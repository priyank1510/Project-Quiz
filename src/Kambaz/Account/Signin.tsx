import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import * as db from "../Database";
import * as client from "./client";

export default function Signin() {

    const [error, setError] = useState("");

    const [credentials, setCredentials] = useState<any>({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const signin = async () => {

        

        try {
            const user = await client.signin(credentials);
            if (!user) {
                setError("Invalid username or password");
                return;
            }
            const userNew = { ...user, isStaff: user.role === "FACULTY" }
            dispatch(setCurrentUser(userNew));
            localStorage.setItem("USER", JSON.stringify(userNew));
            console.log(userNew);

            navigate("/Kambaz/Account/Profile");
        } catch (err: any) {
            // Handle different types of errors
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else if (err.message) {
                setError(err.message);
            } else {
                setError("An error occurred during sign in. Please try again.");
            }
        }

    };

    return (
        <div id="wd-signin-screen">
            <h1>Sign in</h1>
            {error && <div className="wd-error alert alert-danger">{error}</div>}

            <input value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className="form-control mb-2" placeholder="username" id="wd-username" />
            <input value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="form-control mb-2" placeholder="password" type="password" id="wd-password" />
            <button onClick={signin} id="wd-signin-btn" className="btn btn-primary w-100" > Sign in </button>
            <Link id="wd-signup-link" to="/Kambaz/Account/Signup"> Sign up </Link>
        </div>
    );
}
