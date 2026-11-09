import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const Paginate =
    typeof ReactPaginate === "function"
      ? ReactPaginate
      : (ReactPaginate as unknown as {
          default: typeof ReactPaginate;
        }).default;

  return (
    <Paginate
      previousLabel="←"
      nextLabel="→"
      breakLabel="..."
      pageCount={pageCount}
      forcePage={currentPage - 1}
      onPageChange={(event: { selected: number }) =>
        onPageChange(event.selected + 1)
      }
      containerClassName={css.pagination}
      activeClassName={css.active}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
    />
  );
}