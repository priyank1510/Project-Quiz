import AddingAndRemovingToFromArrays from "./AddingAndRemovingToFromArrays";
import ArrayIndexAndLength from "./ArrayIndexAndLength";
import ArrowFunctions from "./ArrowFunctions";
import BooleanVariables from "./BooleanVariables";
import Classes from "./Classes";
import ConditionalOutputIfElse from "./ConditionalOutputIfElse";
import ConditionalOutputInline from "./ConditionalOutputInLine";
import Destructing from "./Destructing";
import DestructingImports from "./DestructingImports";
import FilterFunction from "./FilterFunction";
import FindFunction from "./FindFunction";
import FindIndex from "./FindIndex";
import ForLoops from "./ForLoops";
import FunctionDestructing from "./FunctionDestructing";
import Highlight from "./Highlight";
import House from "./House";
import IfElse from "./IfElse";
import ImpliedReturn from "./ImpliedReturn";
import JsonStringify from "./JsonStringify";
import LegacyFunctions from "./LegacyFunctions";
import MapFunction from "./MapFunction";
import SimpleArrays from "./SimpleArrays";
import Spreading from "./Spreading";
import Styles from "./Styles";
import TemplateLiterals from "./TemplateLiterals";
import TernaryOpertor from "./TernaryOperator";
import TodoItem from "./todos/TodoItem";
import TodoList from "./todos/TodoList";
import VariablesAndConstants from "./VariablesAndConstants";
import VariableTypes from "./VariableTypes";
import Add from "./Add"
import Square from "./Square";
import PathParameters from "./PathParameters";
import { useSelector } from "react-redux";

export default function Lab3() {
  const { todos } = useSelector((state: any) => state.todosReducer);

  console.log("Hello World");
  return (
    <div>
      <h2>Lab 3</h2>

      {/* Part of Lab 4 */}
      <ul className="list-group">
        {todos.map((todo: any) => (
          <li className="list-group-item" key={todo.id}>
            {todo.title}
          </li>
        ))}
      </ul>
      <hr />

      {/* 2.2.1 Variables and Constants */}
      <VariablesAndConstants />

      {/* 2.2.2 Variable Types */}
      <VariableTypes />

      {/* 2.2.3 Boolean Variables */}
      <BooleanVariables />

      {/* 2.2.4 Conditionals */}
      <IfElse />

      {/* 2.2.5 Ternary Conditional Operator */}
      <TernaryOpertor />

      {/* 2.2.6 Generating conditional output */}
      <ConditionalOutputIfElse />
      <ConditionalOutputInline />

      {/* 2.3 JavaScript Functions */}
      <LegacyFunctions />

      {/* 2.3.1 Arrow Functions */}
      <ArrowFunctions />

      {/* 2.3.2 Implied returns */}
      <ImpliedReturn />

      {/* 2.3.3 Template Literals */}
      <TemplateLiterals />

      {/* 2.4.0 Simple Arrays */}
      <SimpleArrays />

      {/* 2.4.1 Array index and length */}
      <ArrayIndexAndLength />

      {/* 2.4.2 Adding and Removing Data to/from Arrays */}
      <AddingAndRemovingToFromArrays />

      {/* 2.4.3 For Loops */}
      <ForLoops />

      {/* 2.4.4 The Map Function */}
      <MapFunction />

      {/* 2.4.5 The Find Function */}
      <FindFunction />

      {/* 2.4.6 The Find Index Function */}
      <FindIndex />

      {/* 2.4.7 The Filter Function */}
      <FilterFunction />

      {/* 2.4.8 JSON Stringify */}
      <JsonStringify />

      {/* 2.4.9 JavaScript Object Notation (JSON) */}
      <House />

      {/* 2.4.10 Rendering a Data Structure */}
      <TodoItem />
      <TodoList />

      {/* 2.4.11 The Spread Operator */}
      <Spreading />

      {/* 2.4.12 Destructing */}
      <Destructing />

      {/* 2.4.13 Destructing Function Parameters */}
      <FunctionDestructing />

      {/* 2.4.14 Destructing Imports */}
      <DestructingImports />

      {/* 2.5.1 Working with HTML classes */}
      <Classes />

      {/* 2.5.2 Working with the HTML Style attribute */}
      <Styles />

      {/* 2.6 Parameterizing Components */}
      <Add a={3} b={4} />

      {/* 2.6.1 Child Components */}
      <h4>Square of 4</h4>
      <Square>4</Square>
      <hr />

      <Highlight>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione eaque illo minus cum, saepe totam
        vel nihil repellat nemo explicabo excepturi consectetur. Modi omnis minus sequi maiores, provident voluptates.
      </Highlight>

      {/* 2.6.3 Encoding Path Parameters */}
      <PathParameters />

    </div>
  );
}
