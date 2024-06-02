import { GenericKeyValueType, GenericValueType } from "../../types/global";

export type TasksType = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  status: GenericValueType;
};
export type TasksDataType = {
  data: TasksType[];
  total: number;
};
export type TableDataType = {
  columns: GenericKeyValueType[];
  rows: GenericKeyValueType[];
};
