import * as client from "./client";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Session({ children }: { children: any }) {
    const [pending, setPending] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchProfile = async () => {
        try {
            const currentUser = await client.profile();
            if (currentUser) {
                // Store user data in both Redux and localStorage
                dispatch(setCurrentUser(currentUser));
                localStorage.setItem("USER", JSON.stringify(currentUser));
            } else {
                localStorage.removeItem("USER");
                navigate("/Kambaz/Account/Signin");
            }
        } catch (err: any) {
            console.error("Error fetching profile:", err.response?.data || err.message);
            if (err.response?.status === 401) {
                localStorage.removeItem("USER");
                navigate("/Kambaz/Account/Signin");
            }
        } finally {
            setPending(false);
        }
    };

    useEffect(() => {
        // Try to get user from localStorage first
        const storedUser = localStorage.getItem("USER");
        if (storedUser) {
            dispatch(setCurrentUser(JSON.parse(storedUser)));
            setPending(false);
        }
        // Then fetch fresh data from server
        fetchProfile();
    }, []);

    if (pending) {
        return <div>Loading...</div>;
    }

    return children;
}
