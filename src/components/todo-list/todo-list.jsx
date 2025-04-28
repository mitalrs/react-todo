import * as React from 'react';
import { Checkbox } from '../checkbox';
import { Pagination } from '../pagination';
import { TodosContext } from '../../todo-context';
import './todo-list.scss';

export const TodoList = () => {
  const { todos, setTodos } = React.useContext(TodosContext);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTodos = todos.slice(indexOfFirstItem, indexOfLastItem);

  const handleDelete = (id) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.filter((todoItem) => todoItem.id !== id);
      
      // Check if the current page is now empty and we're not on the first page
      const currentPageItems = updatedTodos.slice(indexOfFirstItem, indexOfLastItem);
      if (currentPageItems.length === 0 && currentPage > 1) {
        // Schedule state update for next render cycle to avoid batching issues
        setTimeout(() => setCurrentPage(currentPage - 1), 0);
      }
      
      return updatedTodos;
    });
  };

  const toggleCheck = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todoItem) =>
        todoItem.id === id ? { ...todoItem, checked: !todoItem.checked } : todoItem
      )
    );
  };

  const handleKeyUp = (e, id) => {
    if (e.keyCode === 13) { //Enter key
      toggleCheck(id);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="todo-list">
      <span className="todo-list-title">Things to do:</span>
      {todos.length ? (
        <>
          <div className="todo-list-content">
            {currentTodos.map((todoItem) => (
              <Checkbox
                key={todoItem.id}
                label={todoItem.label}
                checked={todoItem.checked}
                onClick={() => toggleCheck(todoItem.id)}
                onKeyUp={(e) => handleKeyUp(e, todoItem.id)}
                onDelete={() => handleDelete(todoItem.id)}
              />
            ))}
          </div>
          <Pagination 
            totalItems={todos.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div className="no-todos">Looks like you're up for a challenge!</div>
      )}
    </div>
  );
};