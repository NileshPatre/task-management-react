import React from "react";
import { Pagination } from "react-bootstrap";
import styles from "./index.module.css";
interface Props {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const SimplePagination: React.FC<Props> = ({
  totalPages,
  currentPage,
  onPageChange
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <Pagination className={styles["pagination-container"]}>
      <Pagination.Prev onClick={handlePrevious} disabled={currentPage === 1} />
      <span className={styles["page-number"]}>Page number - {currentPage}</span>
      <Pagination.Next
        onClick={handleNext}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
};

export default SimplePagination;
