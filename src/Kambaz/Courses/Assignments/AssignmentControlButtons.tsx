import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash } from "react-icons/fa";

export default function AssignmentControlButtons(
    { assignmentId, onDelete }: { assignmentId: string, onDelete: (id: string) => void }
) {
    return (
        <div className="float-end">
            <FaTrash onClick={() => onDelete(assignmentId)} className="me-2" />
            <GreenCheckmark />
            <IoEllipsisVertical className="fs-4" />
        </div>
    );
}