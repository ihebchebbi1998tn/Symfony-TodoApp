import React, { useContext } from "react";
import { TodoContext } from "../Contexts/TodoContexts";

function TodoTable() {
  const context = useContext(TodoContext);
  
  return (
    <div>
      {context.todos.map(todo => (
        <div>{todo.task}</div>
      ))}
    </div>
  );
}

export default TodoTable;
