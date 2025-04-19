import { createSlice } from "@reduxjs/toolkit";
// import { assignments as initialAssignments } from "../../Database";

const initialState = {
    assignments: [],
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        addAssignment: (state, { payload: assignment }) => {
            const newAssignment = {
                _id: new Date().getTime().toString(),
                title: assignment.title,
                course: assignment.course,
                description: assignment.description,
                points: assignment.points,
                due_date: assignment.due_date,
                available_from_date: assignment.available_from_date,
                available_until_date: assignment.available_until_date,
                gradeType: assignment.gradeType,
                submissionType: assignment.submissionType,
                entry: assignment.entry,
                display_grade:assignment.display_grade,
                Assignmentgroup:assignment.Assignmentgroup ,
 
            };
            state.assignments = [...state.assignments, newAssignment] as any;
        },

        updateAssignment: (state, { payload: updatedAssignment }) => {
            state.assignments = state.assignments.map((assignment: any) =>
                assignment._id === updatedAssignment._id ? updatedAssignment : assignment
            ) as any;
        },
        deleteAssignment: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.filter(
                (assignment: any) => assignment._id !== assignmentId
            );
        },
        setAssignments: (state, action) => {
            state.assignments = action.payload;
        }
    },
});

export const {
    addAssignment,
    updateAssignment,
    deleteAssignment,
    setAssignments
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
