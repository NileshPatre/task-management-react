import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./index.module.css";
interface Props {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
}
const RangeDatePicker: React.FC<Props> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange
}) => {
  return (
    <div className={styles.datePickerContainer}>
      <div className={styles.datePickerWrapper}>
        <DatePicker
          showIcon={true}
          selected={startDate}
          onChange={(date) => onStartDateChange(date)}
          placeholderText="Start Date"
          dateFormat="yyyy-MM-dd"
          showYearDropdown
          showMonthDropdown
          scrollableYearDropdown
        />
      </div>
      <div className={styles.datePickerWrapper}>
        <DatePicker
          showIcon={true}
          selected={endDate}
          onChange={(date) => onEndDateChange(date)}
          placeholderText="End Date"
          dateFormat="yyyy-MM-dd"
          showYearDropdown
          showMonthDropdown
          scrollableYearDropdown
        />
      </div>
    </div>
  );
};

export default RangeDatePicker;
