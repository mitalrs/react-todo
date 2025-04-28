import * as React from 'react';
import './todo-results.scss';
import { TodosContext } from '../../todo-context'

export const TodoResults = () => {
  const { todos } = React.useContext(TodosContext);

  const calculateChecked = () => {
    // Fix the app to count the completed tasks
    // return todos.filter((prevTodos)=>prevTodos.checked === true).length;
    return (<div>
      {todos.filter((prevTodos) => prevTodos.checked === true).length}/{todos.length}
    </div>)
  };

  return (
    <div className="todo-results">
      Done:
      {calculateChecked()}
    </div>
  );
};
