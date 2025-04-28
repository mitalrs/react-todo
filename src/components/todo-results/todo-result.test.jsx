import React from 'react';
import { render, screen } from '@testing-library/react';
import { TodoResults } from './todo-results';
import { TodosContext } from '../../todo-context';

const renderWithContext = (todos) => {
  return render(
    <TodosContext.Provider value={{ todos }}>
      <TodoResults />
    </TodosContext.Provider>
  );
};

describe('TodoResults Component', () => {
  test('renders without crashing', () => {
    renderWithContext([]);
    expect(screen.getByText(/Done:/i)).toBeInTheDocument();
  });

  test('displays correct count when no todos are completed', () => {
    const todos = [
      { label: 'Task 1', checked: false },
      { label: 'Task 2', checked: false }
    ];
    renderWithContext(todos);

    expect(screen.getByText('Done:0')).toBeInTheDocument();
  });

  test('displays correct count when some todos are completed', () => {
    const todos = [
      { label: 'Task 1', checked: true },
      { label: 'Task 2', checked: false },
      { label: 'Task 3', checked: true }
    ];
    renderWithContext(todos);

    expect(screen.getByText('Done:2')).toBeInTheDocument();
  });

  test('displays correct count when all todos are completed', () => {
    const todos = [
      { label: 'Task 1', checked: true },
      { label: 'Task 2', checked: true }
    ];
    renderWithContext(todos);

    expect(screen.getByText('Done:2')).toBeInTheDocument();
  });
});
