import React from "react";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <div className="flex justify-center items-center space-x-4">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
      >
        Previous
      </button>
      <span className="font-semibold">
        Page {currentPage} of {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
