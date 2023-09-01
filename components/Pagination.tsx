import React, { useState } from "react";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  onPageChange,
}): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
    onPageChange(selectedPage.selected + 1);
  };

  return (
    <div className="flex justify-center mt-4 overflow-x-auto">
      {/* Wrap the pagination component in a container with horizontal scrolling */}
      <ReactPaginate
        previousLabel={"←"}
        nextLabel={"→"}
        breakLabel={"..."}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        forcePage={currentPage}
        containerClassName={"flex"}
        pageClassName={"pagination_link"}
        previousClassName={"pagination_link"}
        nextClassName={"pagination_link"}
        breakClassName={"pagination_link"}
        activeClassName={"bg-[#1565D8] text-white"}
        disabledClassName={"cursor-not-allowed text-gray-400"}
        previousLinkClassName={"cursor-pointer"}
        nextLinkClassName={"cursor-pointer"}
        pageLinkClassName={"cursor-pointer"}

        // Use Tailwind CSS classes for adaptive design
        pageLinkClassName={"text-sm sm:text-base md:text-lg px-2"}
        previousLinkClassName={"text-sm sm:text-base md:text-lg px-2"}
        nextLinkClassName={"text-sm sm:text-base md:text-lg px-2"}
      />
    </div>
  );
};

export default Pagination;
