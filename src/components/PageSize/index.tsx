import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { DEFAULT_PAGE_SIZE } from "../../services/constants";
import styles from "./index.module.css";
interface Props {
  inputPageSize: number;
  onPageSizeChange: (size: number) => void;
}

const PageSizeComponent: React.FC<Props> = ({
  inputPageSize,
  onPageSizeChange
}) => {
  const [pageSize, setPageSize] = useState<number>(
    inputPageSize || DEFAULT_PAGE_SIZE
  ); // Initialize page size to 20

  const handlePageSizeChange = (size: number) => {
    setPageSize(size); // Update local state with selected page size
    onPageSizeChange(size); // Notify parent component of page size change
  };

  return (
    <Dropdown className={styles.pageSizeContainer}>
      <Dropdown.Toggle className={styles.dropdownToggle} variant="success" id="dropdown-basic">
        {`Page size: ${pageSize}`} {/* Display the selected page size */}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handlePageSizeChange(20)}>
          20
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handlePageSizeChange(50)}>
          50
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handlePageSizeChange(100)}>
          100
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

// Memoize the PageSize component to prevent unnecessary re-renders
const PageSize = React.memo(PageSizeComponent);

export default PageSize;
