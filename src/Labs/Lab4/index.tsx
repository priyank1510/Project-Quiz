import ArrayStateVariable from "./ArrayStateVariable";
import BooleanStateVariables from "./BooleanStateVariables";
import ClickEvent from "./ClickEvent";
import Counter from "./Counter";
import DateStateVariable from "./DateStateVariable";
import EventObject from "./EventObject";
import ObjectStateVariable from "./ObjectStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import ReduxExamples from "./ReduxExamples";
import StringStateVariables from "./StringStateVariables";

export default function Lab4() {
    function sayHello() {
        alert("Hello");
    }

    return (
        <div id="wd-passing-functions">
            <h2>Lab 4</h2>

            {/* 2.2.1 Handling Click Events */}
            <ClickEvent />

            {/* 2.2.2 Passing Data when Handling Events */}
            <PassingDataOnEvent />

            {/* 2.2.3 Passing Functions as Parameters */}
            <PassingFunctions theFunction={sayHello} />

            {/* 2.2.4 The Event Object */}
            <EventObject />

            {/* 2.3.2 Integer State Variables */}
            <Counter />

            {/* 2.3.3 Boolean State Variables */}
            <BooleanStateVariables />

            {/* 2.3.4 String State Variables */}
            <StringStateVariables />

            {/* 2.3.5 Date State Variables */}
            <DateStateVariable />

            {/* 2.3.6 Object State Variables */}
            <ObjectStateVariable />

            {/* 2.3.7 Array State Variables */}
            <ArrayStateVariable />

            {/* 2.3.8 Sharing State Between Components */}
            <ParentStateComponent />
            
            {/* 2.4 Managing Application State */}
            <ReduxExamples />

        </div>
    );
}
