import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Filter } from './filter';
import { TodosContext } from '../../todo-context';

const mockTodos = [
  { label: 'Task 1', checked: false },
  { label: 'Task 2', checked: true },
  { label: 'Task 3', checked: false }
];

const renderWithContext = (todos = mockTodos, setTodos = jest.fn()) => {
  return {
    setTodos,
    ...render(
      <TodosContext.Provider value={{ todos, setTodos }}>
        <Filter />
      </TodosContext.Provider>
    ),
  };
};

describe('Filter Component', () => {
  test('renders All, Completed, and Incomplete buttons', () => {
    renderWithContext();

    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('Incomplete')).toBeInTheDocument();
  });

  test('clicking "All" button calls setTodos with all todos', () => {
    const { setTodos } = renderWithContext();

    fireEvent.click(screen.getByText('All'));

    expect(setTodos).toHaveBeenCalledWith(mockTodos);
  });

  test('clicking "Completed" button calls setTodos with only completed todos', () => {
    const { setTodos } = renderWithContext();

    fireEvent.click(screen.getByText('Completed'));

    const completedTodos = mockTodos.filter(todo => todo.checked);
    expect(setTodos).toHaveBeenCalledWith(completedTodos);
  });

  test('clicking "Incomplete" button calls setTodos with only incomplete todos', () => {
    const { setTodos } = renderWithContext();

    fireEvent.click(screen.getByText('Incomplete'));

    const incompleteTodos = mockTodos.filter(todo => !todo.checked);
    expect(setTodos).toHaveBeenCalledWith(incompleteTodos);
  });

  test('button active class toggles correctly on filter change', () => {
    renderWithContext();

    const allButton = screen.getByText('All');
    const completedButton = screen.getByText('Completed');
    const incompleteButton = screen.getByText('Incomplete');

    // Initially "All" should have active class
    expect(allButton.className).toContain('active');

    // "Completed"
    fireEvent.click(completedButton);
    expect(completedButton.className).toContain('active');
    expect(allButton.className).not.toContain('active');

    // "Incomplete"
    fireEvent.click(incompleteButton);
    expect(incompleteButton.className).toContain('active');
    expect(completedButton.className).not.toContain('active');
  });
});
