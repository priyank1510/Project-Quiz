import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function Profile() {
    const [profile, setProfile] = useState<any>({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const updateProfile = async () => {
        const updatedProfile = await client.updateUser(profile);
        dispatch(setCurrentUser(updatedProfile));
    };
    const fetchProfile = async () => {
        if (!currentUser) return navigate("/Kambaz/Account/Signin");
        setProfile(currentUser);
    };
    const signout = async () => {
        await client.signout();
        dispatch(setCurrentUser(null));
        navigate("/Kambaz/Account/Signin");
        localStorage.setItem("USER", "");
    };
    useEffect(() => { fetchProfile(); }, []);
    return (
        <div className="wd-profile-screen">
            <h3>Profile</h3>
            {profile && (
                <div>
                    <input value={profile.username} id="wd-username" className="form-control mb-2"
                        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                        placeholder="Username" />
                    <input value={profile.password} id="wd-password" className="form-control mb-2"
                        onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                        placeholder="Password" />
                    <input value={profile.firstName} id="wd-firstname" className="form-control mb-2"
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                        placeholder="First Name" />
                    <input value={profile.lastName} id="wd-lastname" className="form-control mb-2"
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                        placeholder="Last Name" />
                    <input value={profile.dob} id="wd-dob" className="form-control mb-2"
                        onChange={(e) => setProfile({ ...profile, dob: e.target.value })} type="date" />
                    <input value={profile.email} id="wd-email" className="form-control mb-2"
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        placeholder="Email" />
                    <select onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                        className="form-control mb-2" id="wd-role">
                        <option value="USER">
                            User
                        </option>
                        <option value="ADMIN">
                            Admin
                        </option>
                        <option value="FACULTY">
                            Faculty
                        </option>
                        <option value="STUDENT">
                            Student
                        </option>
                    </select>
                    <button onClick={updateProfile} className="btn btn-primary w-100 mb-2">
                        Update
                    </button>
                    <button onClick={signout} className="btn btn-danger w-100 mb-2" id="wd-signout-btn">
                        Sign out
                    </button>
                </div>
            )}
        </div>);
}
