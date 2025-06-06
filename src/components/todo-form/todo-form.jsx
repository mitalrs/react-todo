import * as React from 'react';
import { TodosContext } from '../../todo-context';
import './todo-form.scss';

export const TodoForm = () => {
  const { setTodos } = React.useContext(TodosContext);
  const [task, setTask] = React.useState('');


  const handleAddTodo = () => {
    // Fix the app to display list of all tasks
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Date.now(), label: task, checked: false }, 
    ]);
    setTask('');
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      handleAddTodo();
    }
  };

  return (
    <div className="todo-form">
      <input
        placeholder="Enter new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyUp={handleKeyUp}
      />
      <button type="button" onClick={handleAddTodo}>
        Add task
      </button>
    </div>
  );
};
