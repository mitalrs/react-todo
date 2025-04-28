import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './pagination'; // adjust the path if needed

describe('Pagination component', () => {
  const setup = (props) => {
    const defaultProps = {
      totalItems: 30,
      itemsPerPage: 10,
      onPageChange: jest.fn(),
      ...props,
    };
    render(<Pagination {...defaultProps} />);
    return {
      onPageChange: defaultProps.onPageChange,
    };
  };

  test('renders Prev and Next buttons and current page', () => {
    setup();

    expect(screen.getByText('Prev')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  test('Prev button is disabled on first page', () => {
    setup();

    expect(screen.getByText('Prev')).toBeDisabled();
  });

  test('Next button is enabled on first page when there are multiple pages', () => {
    setup();

    expect(screen.getByText('Next')).not.toBeDisabled();
  });

  test('clicking Next button moves to next page and calls onPageChange', () => {
    const { onPageChange } = setup();

    fireEvent.click(screen.getByText('Next'));

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  test('clicking Prev button does not go below page 1', () => {
    const { onPageChange } = setup();

    fireEvent.click(screen.getByText('Prev'));

    // Prev should be disabled on first page
    expect(onPageChange).not.toHaveBeenCalled();
  });

  test('clicking Next until last page disables Next button', () => {
    const { onPageChange } = setup();

    fireEvent.click(screen.getByText('Next')); // Page 2
    fireEvent.click(screen.getByText('Next')); // Page 3

    expect(onPageChange).toHaveBeenCalledWith(2);
    expect(onPageChange).toHaveBeenCalledWith(3);
    expect(screen.getByText('Next')).toBeDisabled(); // No pages after 3
  });

  test('does not render if totalItems is 0', () => {
    render(<Pagination totalItems={0} itemsPerPage={10} onPageChange={jest.fn()} />);

    expect(screen.queryByText('Prev')).not.toBeInTheDocument();
    expect(screen.queryByText('Next')).not.toBeInTheDocument();
  });
});
