export type APIParameters = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
};
export type GenericValueType = {
  id: string;
  name: string;
  label: string;
};
export type FilterTypes = "dateRange";
export interface DataPoint {
  id: string;
  name: string;
  label: string;
}
export type UpdateSuccessType = {
  success: string;
  message?: string;
};
export type FilterType = {
  filterName: string;
  filterType: string;
  filterValues: FilterValuesType[];
};
export type FilterValuesType = {
  id: string;
  value?: string;
};
export type GenericKeyValueType = {
  [key: string | number]: string | number;
};
