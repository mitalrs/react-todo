import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock data
jest.mock('./components/search', () => ({
  Search: () => <div data-testid="search-component" />
}));

jest.mock('./components/filter', () => ({
  Filter: () => <div data-testid="filter-component" />
}));

jest.mock('./components/todo-form', () => ({
  TodoForm: () => <div data-testid="todo-form-component" />
}));

jest.mock('./components/todo-list', () => ({
  TodoList: () => <div data-testid="todo-list-component" />
}));

jest.mock('./components/todo-results', () => ({
  TodoResults: () => <div data-testid="todo-results-component" />
}));

describe('App Component', () => {
  beforeEach(() => {
    // Clear any localStorage before each test
    localStorage.clear();
  });

  test('renders App with all child components', () => {
    render(<App />);

    // render for all mocked child comp
    expect(screen.getByTestId('search-component')).toBeInTheDocument();
    expect(screen.getByTestId('filter-component')).toBeInTheDocument();
    expect(screen.getByTestId('todo-form-component')).toBeInTheDocument();
    expect(screen.getByTestId('todo-list-component')).toBeInTheDocument();
    expect(screen.getByTestId('todo-results-component')).toBeInTheDocument();
  });

  test('loads todos from localStorage if available', () => {
    const mockTodos = [{ id: 1, label: 'Test todo', checked: false }];
    localStorage.setItem('todos', JSON.stringify(mockTodos));

    render(<App />);

    expect(screen.getByTestId('todo-list-component')).toBeInTheDocument();
  });

  test('loads default todos template if localStorage is empty', () => {
    render(<App />);

    expect(screen.getByTestId('todo-list-component')).toBeInTheDocument();
  });
});
