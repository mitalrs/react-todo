import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './checkbox';

describe('Checkbox Component', () => {

  test('checkbox displays "checked" class when checked', () => {
    render(<Checkbox label="Test Label" checked={true} onClick={() => {}} onDelete={() => {}} />);
    
    const checkboxLabel = screen.getByText('Test Label');
    
    expect(checkboxLabel).toHaveClass('checkbox-checked');
  });

  test('calls onDelete when delete button is clicked', () => {
    const handleDelete = jest.fn();
    
    render(<Checkbox label="Test Label" checked={false} onClick={() => {}} onDelete={handleDelete} />);
    
    const deleteButton = screen.getByRole('button', { name: /x/i });
    
    fireEvent.click(deleteButton);
    
    expect(handleDelete).toHaveBeenCalledTimes(1);
  });

});
