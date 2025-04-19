import React from "react";
import HelloRedux from "./HelloRedux";
import CounterRedux from "./CounterRedux";
import AddRedux from "./AddRedux";
import TodoList from "./todos/TodoList";

export default function ReduxExamples() {
    return (
        <div>
            <h2>Redux Examples</h2>

            {/* 2.4.2 Create a Hello World Redux component */}
            <HelloRedux />

            {/* 2.4.3 Counter Redux - Dispatching Events to Reducers */}
            <CounterRedux />

            {/* 2.4.4 Passing Data to Reducers */}
            <AddRedux />

            {/* 2.5 Implementing a Todo List with Redux */}
            <TodoList />
        </div>
    );
};
