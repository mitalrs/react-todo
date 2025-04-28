import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoForm } from './todo-form';
import { TodosContext } from '../../todo-context';

const renderWithContext = (todos = [], setTodos = jest.fn()) => {
  return render(
    <TodosContext.Provider value={{ todos, setTodos }}>
      <TodoForm />
    </TodosContext.Provider>
  );
};

describe('TodoForm Component', () => {
  test('renders input and button correctly', () => {
    renderWithContext();

    const input = screen.getByPlaceholderText('Enter new task');
    expect(input).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /add task/i });
    expect(button).toBeInTheDocument();
  });

  test('allows user to type in the input', () => {
    renderWithContext();

    const input = screen.getByPlaceholderText('Enter new task');


    fireEvent.change(input, { target: { value: 'New Todo' } });
    expect(input.value).toBe('New Todo');
  });

  test('calls setTodos and clears input when "Add task" button is clicked', () => {
    const setTodosMock = jest.fn();
    renderWithContext([], setTodosMock);

    const input = screen.getByPlaceholderText('Enter new task');
    const button = screen.getByRole('button', { name: /add task/i });

    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(button);

    // Expect setTodos to be called once
    expect(setTodosMock).toHaveBeenCalledTimes(1);

    // Check that setTodos was called with a function
    expect(typeof setTodosMock.mock.calls[0][0]).toBe('function');

    // After clicking, input should be cleared
    expect(input.value).toBe('');
  });

  test('calls setTodos when pressing "Enter" key', () => {
    const setTodosMock = jest.fn();
    renderWithContext([], setTodosMock);

    const input = screen.getByPlaceholderText('Enter new task');

    fireEvent.change(input, { target: { value: 'Task via Enter' } });
    fireEvent.keyUp(input, { key: 'Enter', keyCode: 13 });

    expect(setTodosMock).toHaveBeenCalledTimes(1);
    expect(typeof setTodosMock.mock.calls[0][0]).toBe('function');
    expect(input.value).toBe('');
  });
});
