import React from 'react';
import { TodosContext } from '../../todo-context'; // Assuming this is the correct path
import './filter.scss';

export const Filter = () => {
  const { todos, setTodos } = React.useContext(TodosContext);
  const [activeFilter, setActiveFilter] = React.useState('all');
  const originalTodosRef = React.useRef(null);

  
  React.useEffect(() => {
    if (!originalTodosRef.current) {
      originalTodosRef.current = [...todos];
    } else {
      if (activeFilter === 'all') {
        originalTodosRef.current = [...todos];
      } else {
        // When in filtered view, ensure original ref has all the latest changes
        const updatedOriginal = [...originalTodosRef.current];
        
        // Find updates or new items from current filtered view
        todos.forEach(todo => {
          const index = updatedOriginal.findIndex(t => 
            t.label === todo.label
          );
          
          if (index !== -1) {
            // Update existing item in original list
            updatedOriginal[index] = { ...todo };
          } else {
            // Add new item to original list
            updatedOriginal.push({ ...todo });
          }
        });
        
        originalTodosRef.current = updatedOriginal;
      }
    }
  }, [todos, activeFilter]);

  const applyFilter = (filterType) => {
    setActiveFilter(filterType);
    
    if (filterType === 'all') {
      setTodos(originalTodosRef.current || []);
    } else {
      const isCompleted = filterType === 'completed';
      const filteredTodos = originalTodosRef.current.filter(
        todo => todo.checked === isCompleted
      );
      setTodos(filteredTodos);
    }
  };

  return (
    <div className="filter-container">
      <button
        className={activeFilter === 'all' ? 'active' : ''}
        onClick={() => applyFilter('all')}
      >
        All
      </button>
      <button
        className={activeFilter === 'completed' ? 'active' : ''}
        onClick={() => applyFilter('completed')}
      >
        Completed
      </button>
      <button
        className={activeFilter === 'incomplete' ? 'active' : ''}
        onClick={() => applyFilter('incomplete')}
      >
        Incomplete
      </button>
    </div>
  );
};