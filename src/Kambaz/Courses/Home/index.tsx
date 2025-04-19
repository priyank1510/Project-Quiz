import ProtectedContent from "../../Account/ProtectedContent";
import Modules from "../Modules";
import CourseStatus from "./Status";
export default function Home() {
    return (
        <div className="d-flex wrapper" id="wd-home">
            <div className="flex-fill">
                <Modules />
            </div>
            <ProtectedContent allowedRoles={["FACULTY"]}>
                <div className="d-none d-md-block">
                    <CourseStatus />
                </div>
            </ProtectedContent>
        </div>
    );
}
