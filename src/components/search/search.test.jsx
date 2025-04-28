import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Search } from './search';
import { TodosContext } from '../../todo-context'; 

describe('Search Component', () => {
  let todosMock;
  let setTodosMock;

  const renderWithContext = (todos = todosMock) => {
    return render(
      <TodosContext.Provider value={{ todos, setTodos: setTodosMock }}>
        <Search />
      </TodosContext.Provider>
    );
  };

  beforeEach(() => {
    todosMock = [
      { label: 'Buy groceries', checked: false },
      { label: 'Walk the dog', checked: true },
      { label: 'Read a book', checked: false }
    ];
    setTodosMock = jest.fn();
  });

  test('renders input field', () => {
    renderWithContext();
    expect(screen.getByPlaceholderText('Search tasks...')).toBeInTheDocument();
  });

  test('updates search input value on typing', () => {
    renderWithContext();
    const input = screen.getByPlaceholderText('Search tasks...');

    fireEvent.change(input, { target: { value: 'walk' } });

    expect(input.value).toBe('walk');
  });

  test('filters todos based on search input', () => {
    renderWithContext();
    const input = screen.getByPlaceholderText('Search tasks...');

    fireEvent.change(input, { target: { value: 'dog' } });

    // Should call setTodos with filtered todos
    expect(setTodosMock).toHaveBeenCalledWith([
      { label: 'Walk the dog', checked: true }
    ]);
  });

  test('clears search input and restores original todos when clear button is clicked', () => {
    renderWithContext();
    const input = screen.getByPlaceholderText('Search tasks...');

    fireEvent.change(input, { target: { value: 'dog' } });
    const clearButton = screen.getByRole('button', { name: /clear/i });

    fireEvent.click(clearButton);

    expect(input.value).toBe('');
    expect(setTodosMock).toHaveBeenCalledWith(todosMock);
  });

  test('clears search when pressing ESC key', () => {
    renderWithContext();
    const input = screen.getByPlaceholderText('Search tasks...');

    fireEvent.change(input, { target: { value: 'dog' } });

    fireEvent.keyUp(input, { keyCode: 27 });

    expect(input.value).toBe('');
    expect(setTodosMock).toHaveBeenCalledWith(todosMock);
  });

  test('shows clear button only when there is text', () => {
    renderWithContext();
    const input = screen.getByPlaceholderText('Search tasks...');

    // Initially, no Clear button
    expect(screen.queryByRole('button', { name: /clear/i })).toBeNull();

    fireEvent.change(input, { target: { value: 'book' } });

    // Now Clear button should appear
    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
  });
});
