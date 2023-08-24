import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
    onPageChange(selectedPage.selected + 1); // Вызываем коллбэк с номером страницы
  };

  return (
    <ReactPaginate
      previousLabel={"←"}
      nextLabel={"→"}
      breakLabel={"..."}
      pageCount={pageCount}
      onPageChange={handlePageChange}
      forcePage={currentPage}
      containerClassName={"flex justify-center mt-4"}
      pageClassName={
        "inline-flex items-center h-10 px-4 py-2 mx-2 font-medium bg-white text-gray-700 border border-gray-300 cursor-pointer rounded-lg hover:bg-gray-100"
      }
      previousClassName={
        "inline-flex items-center h-10 px-4 py-2 mx-2 font-medium bg-white text-gray-700 border border-gray-300 cursor-pointer rounded-lg hover:bg-gray-100"
      }
      nextClassName={
        "inline-flex items-center h-10 px-4 py-2 mx-2 font-medium bg-white text-gray-700 border border-gray-300 cursor-pointer rounded-lg hover:bg-gray-100"
      }
      breakClassName={
        "inline-flex items-center h-10 px-4 py-2 mx-2 font-medium bg-white text-gray-700 border border-gray-300 cursor-pointer rounded-lg hover:bg-gray-100"
      }
      activeClassName={"bg-blue-500 text-white"}
      disabledClassName={"cursor-not-allowed"}
    />
  );
};

export default Pagination;
