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
    <ReactPaginate
      previousLabel={"←"}
      nextLabel={"→"}
      breakLabel={"..."}
      pageCount={pageCount}
      onPageChange={handlePageChange}
      forcePage={currentPage}
      containerClassName={"flex justify-center mt-4"}
      pageClassName={"pagination_link"}
      previousClassName={"pagination_link"}
      nextClassName={"pagination_link"}
      breakClassName={"pagination_link"}
      activeClassName={"bg-[#1565D8] text-[#1565D8]"}
      disabledClassName={"cursor-not-allowed"}
      previousLinkClassName={"cursor-pointer"}
      nextLinkClassName={"cursor-pointer"}
      pageLinkClassName={"cursor-pointer"}
      previousLinkHref={"#"}
      nextLinkHref={"#"}
      pageLinkHref={"#"}
      pageLinkStyle={{ cursor: "pointer" }}
      previousLinkStyle={{ cursor: "pointer" }}
      nextLinkStyle={{ cursor: "pointer" }}
      pageRangeDisplayed={5}
    />
  );
};

export default Pagination;
