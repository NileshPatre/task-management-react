import moment from "moment";
import { TasksType } from "./types";
import { GenericKeyValueType } from "../../types/global";

export function getTableData(tasks: TasksType[]) {
  let columns: GenericKeyValueType[] = [
    {
      Header: "Id",
      accessor: "col1", // accessor is the "key" in the data
    },
    {
      Header: "Title",
      accessor: "col2",
    },
    {
      Header: "Description",
      accessor: "col3",
    },
    {
      Header: "Status",
      accessor: "col4",
    },
    {
      Header: "Created at",
      accessor: "col5",
    },
    {
      Header: "Updated at",
      accessor: "col6",
    },
  ];
  let rows: GenericKeyValueType[] = [];
  tasks?.forEach((item: TasksType) => {
    rows.push({
      col1: item.id,
      col2: item.title,
      col3: item.description,
      col4: item.status?.label,
      col5: moment(item.createdAt).format("YYYY/MM/DD"),
      col6: moment(item.updatedAt).format("YYYY/MM/DD"),
    });
  });
  return { columns, rows };
}
