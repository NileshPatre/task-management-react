import React, { useMemo } from "react";
import { useTable, usePagination } from "react-table";
import styles from "./index.module.css";
import { GenericKeyValueType } from "../../types/global";
import Icon from "../Icon";

interface Props {
  columnData: GenericKeyValueType[];
  rowData: GenericKeyValueType[];
  onEditClick: (id: string) => void;
  onDelete: (id: string) => void;
}

const TableComponent: React.FC<Props> = ({
  rowData,
  columnData,
  onEditClick,
  onDelete,
}) => {
  const data: GenericKeyValueType[] = useMemo(() => rowData, [rowData]);
  const columns: any = useMemo(() => columnData, [columnData]);

  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data },
    usePagination
  );

  return (
    <div>
      <table className={styles.table} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className={styles.headerRow}
              key={index}
            >
              {headerGroup.headers.map((column, idx) => (
                <th
                  {...column.getHeaderProps()}
                  className={styles.tableHeader}
                  key={idx}
                >
                  {column.render("Header")}
                </th>
              ))}
              <th className={styles.tableHeader}>Actions</th>
            </tr>
          ))}
        </thead>
        <tbody>
          {rows.map((row: any, rowIndex) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={rowIndex} className={styles.row}>
                {row.cells.map((cell: any, cellIndex: number) => (
                  <td
                    {...cell.getCellProps()}
                    className={styles.tableCell}
                    key={cellIndex}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
                <td className={styles.actionCell}>
                  <span onClick={() => onEditClick(row.original.col1)}>
                    <Icon
                      name="edit"
                      hoverText="Edit"
                      className={styles.icon}
                    ></Icon>
                  </span>
                  <span onClick={() => onDelete(row.original.col1)}>
                    <Icon
                      name="delete"
                      hoverText="Delete"
                      className={styles.icon}
                    ></Icon>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
