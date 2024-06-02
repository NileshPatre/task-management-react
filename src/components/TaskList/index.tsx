import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import LoadingState from "../LoadingState";
import { TasksDataType, TableDataType } from "./types";
import { fetchData, saveData } from "../../services/apis";
import TableComponent from "../Table";
import { getTableData } from "./services";
import PageSize from "../PageSize";
import useDebounce from "../../customHooks/useDebounce";
import SimplePagination from "../Pagination";
import RangeDatePicker from "../Datepicker";
import { createFilterValues, getFilterValues } from "../../services/utils";
import moment from "moment";
import { Form, Button } from "react-bootstrap";
import styles from "./index.module.css";
import { FilterType } from "../../types/global";
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
} from "../../services/constants";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../ConfirmationModal";
import { toast } from "react-toastify";
const TaskList = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [pageNumber, setPageNumber] = useState<number>(DEFAULT_PAGE_NUMBER);
  const debouncedSearch = useDebounce(search, 500); // Debounce search input
  const [filters, setFilters] = useState<FilterType[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<string>();
  const [refesh, setRefresh] = useState<number>(0);
  const { data, isLoading, isError, refetch } = useQuery<TasksDataType, Error>(
    ["tasks"],
    () =>
      fetchData<TasksDataType>(
        {
          method: "GET",
          url: "/task-management/getTasks",
        },
        { search: debouncedSearch, pageNumber, pageSize, filters }
      )
  );
  useEffect(() => {
    refetch();
  }, [debouncedSearch, pageSize, pageNumber, refetch, filters, refesh]);
  const tableData: TableDataType | null = useMemo(() => {
    if (data) {
      return getTableData(data.data);
    } else {
      return null;
    }
  }, [data]);
  const dateRange: {
    start: string | undefined;
    end: string | undefined;
  } | null = useMemo(() => {
    return getFilterValues({
      filterName: "updatedAt",
      filters,
      filterType: "dateRange",
    });
  }, [filters]);
  const handleDelete = (id: string) => {
    setDeleteItemId(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    //api call here to delete
    if (!deleteItemId) {
      return;
    }
    try {
      const response = await saveData<{ id: string }>(
        {
          method: "DELETE",
          url: "/task-management/deleteTask",
        },
        { id: deleteItemId }
      );
      if (response.success) {
        toast.success("Task deleted successful");
        setRefresh(refesh + 1);
      } else {
        throw new Error();
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message.toString());
      } else {
        toast.error("An error occurred during task delete");
      }
    }
    setShowModal(false);
    setDeleteItemId("");
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setDeleteItemId("");
  };
  return (
    <>
      <div className={styles.formContainer}>
        <Form>
          <div className="d-flex align-items-end">
            <Form.Group
              className={`col-md-4 ${styles["search-field"]}`}
              controlId="searchInput"
            >
              <Form.Control
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPageNumber(1);
                }}
                placeholder="Search..."
                className={styles.searchFieldInput}
              />
            </Form.Group>
            <Form.Group className={` col-md-6 ${styles.datePickerGroup}`}>
              <Form.Label className={styles.datePickerLabel}>
                Updated At:
              </Form.Label>
              <RangeDatePicker
                startDate={
                  dateRange?.start ? moment(dateRange.start).toDate() : null
                }
                endDate={dateRange?.end ? moment(dateRange.end).toDate() : null}
                onEndDateChange={(date) => {
                  setFilters([
                    ...createFilterValues({
                      filterName: "updatedAt",
                      filters,
                      filterType: "dateRange",
                      endDate: moment(date).format("YYYY/MM/DD"),
                    }),
                  ]);
                }}
                onStartDateChange={(date) => {
                  setFilters([
                    ...createFilterValues({
                      filterName: "updatedAt",
                      filters,
                      filterType: "dateRange",
                      startDate: moment(date).format("YYYY/MM/DD"),
                    }),
                  ]);
                }}
              />
            </Form.Group>
            <Button
              variant="info"
              className={styles.createTaskButton}
              onClick={() => navigate("/tasks/create")}
            >
              Create Task
            </Button>
          </div>
        </Form>

        {tableData ? (
          <>
            {tableData.rows?.length ? (
              <TableComponent
                onEditClick={(id: string) => {
                  navigate(`/tasks/edit/${id}`);
                }}
                onDelete={(id: string) => {
                  handleDelete(id);
                }}
                rowData={tableData.rows}
                columnData={tableData.columns}
              />
            ) : (
              <LoadingState message={"No Data"} />
            )}
            <div className={styles.pageSizePaginationContainer}>
              <div>
                <PageSize
                  inputPageSize={pageSize}
                  onPageSizeChange={(selectedPageSize) => {
                    setPageSize(selectedPageSize);
                    setPageNumber(1);
                  }}
                />
              </div>
              <div>
                <SimplePagination
                  totalPages={data?.total ? data.total / pageSize : 0}
                  currentPage={pageNumber}
                  onPageChange={(page: number) => {
                    setPageNumber(page);
                  }}
                />
              </div>
            </div>
          </>
        ) : isLoading ? (
          <LoadingState message={"Loading..."} />
        ) : isError ? (
          <LoadingState message={"Error"} />
        ) : (
          ""
        )}
      </div>
      <ConfirmationModal
        show={showModal}
        onHide={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this task?"
      />
    </>
  );
};

export default TaskList;
