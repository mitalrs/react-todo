import * as React from 'react';
import './pagination.scss';

export const Pagination = ({ 
  totalItems, 
  itemsPerPage = 10, 
  onPageChange 
}) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Reset to page 1 if total items or items per page changes
  React.useEffect(() => {
    if (totalPages === 0) {
      setCurrentPage(1);
    } else if (currentPage > totalPages) {
      // If we're on a page that no longer exists (e.g., after deleting items),
      // go back to the last available page
      setCurrentPage(totalPages);
      onPageChange(totalPages);
    }
  }, [totalItems, itemsPerPage, totalPages, currentPage, onPageChange]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
      onPageChange(currentPage + 1);
    }
  };

  // Don't render pagination if there are no items
  if (totalItems === 0) {
    return null;
  }

  return (
    <div className="pagination">
      <button 
        className="pagination-button" 
        onClick={handlePrevPage}
        disabled={currentPage <= 1 }
      >
        Prev
      </button>
      <span className="pagination-page">{currentPage}</span>
      <button 
        className="pagination-button" 
        onClick={handleNextPage}
        disabled={currentPage >= totalPages}
      >
        Next
      </button>
    </div>
  );
};