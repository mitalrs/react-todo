import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoList } from './todo-list';
import { TodosContext } from '../../todo-context';

jest.mock('../checkbox', () => ({
  Checkbox: ({ label, checked, onClick, onKeyUp, onDelete }) => (
    <div>
      <span>{label}</span>
      <button onClick={onClick}>Toggle</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  ),
}));

jest.mock('../pagination', () => ({
  Pagination: ({ totalItems, itemsPerPage, onPageChange }) => (
    <div>
      <button onClick={() => onPageChange(1)}>Page 1</button>
      <button onClick={() => onPageChange(2)}>Page 2</button>
    </div>
  ),
}));

describe('TodoList', () => {
  const todosMock = [
    { id: 1, label: 'Todo 1', checked: false },
    { id: 2, label: 'Todo 2', checked: true },
    { id: 3, label: 'Todo 3', checked: false },
  ];
  const setTodosMock = jest.fn();

  const renderWithContext = (todos = todosMock) => {
    return render(
      <TodosContext.Provider value={{ todos, setTodos: setTodosMock }}>
        <TodoList />
      </TodosContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders title', () => {
    renderWithContext();
    expect(screen.getByText('Things to do:')).toBeInTheDocument();
  });

  test('renders todo items', () => {
    renderWithContext();
    expect(screen.getByText('Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
    expect(screen.getByText('Todo 3')).toBeInTheDocument();
  });

  test('calls toggleCheck when toggle button clicked', () => {
    renderWithContext();
    const toggleButtons = screen.getAllByText('Toggle');
    fireEvent.click(toggleButtons[0]);
    expect(setTodosMock).toHaveBeenCalledTimes(1);
  });

  test('calls handleDelete when delete button clicked', () => {
    renderWithContext();
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);
    expect(setTodosMock).toHaveBeenCalledTimes(1);
  });

  test('renders pagination and handles page change', () => {
    renderWithContext();
    expect(screen.getByText('Page 1')).toBeInTheDocument();
    expect(screen.getByText('Page 2')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Page 2'));
  });

  test('shows message when no todos', () => {
    renderWithContext([]);
    expect(screen.getByText("Looks like you're up for a challenge!")).toBeInTheDocument();
  });
});
