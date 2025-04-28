import * as React from 'react';
import { TodosContext } from '../../todo-context';
import './search.scss';

export const Search = () => {
  const { todos, setTodos } = React.useContext(TodosContext);
  const [searchTask, setSearchTask] = React.useState('');
  const originalTodosRef = React.useRef(null);

  React.useEffect(() => {
    if (searchTask === '') {
      originalTodosRef.current = [...todos];
    }
  }, [todos, searchTask]);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    
    if (searchTask === '' && searchValue !== '') {
      originalTodosRef.current = [...todos]; //just for double check so we have always original data
    }
    
    setSearchTask(searchValue);
    
    if (searchValue.trim() === '') {
      setTodos(originalTodosRef.current || []);
    } else {
      const filteredTodos = originalTodosRef.current.filter(
        (todo) => todo.label.toLowerCase().includes(searchValue.toLowerCase())
      );
      setTodos(filteredTodos);
    }
  };

  const handleClearSearch = () => {
    setSearchTask('');
    if (originalTodosRef.current !== null) {
      setTodos(originalTodosRef.current);
    }
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 27) { //ESC key
      handleClearSearch();
    }
  };

  return (
    <div className="todo-form">
      <input
        placeholder="Search tasks..."
        value={searchTask}
        onChange={handleSearchChange}
        onKeyUp={handleKeyUp}
      />
      {searchTask && (
        <button type="button" onClick={handleClearSearch}>
          Clear
        </button>
      )}
    </div>
  );
};