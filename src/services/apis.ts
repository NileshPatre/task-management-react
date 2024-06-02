import { APIParameters, UpdateSuccessType } from "../types/global";
import axiosInstance from "./axiosInterceptor";
export async function fetchData<T>(
  { method, url }: APIParameters,
  queryParams?: any
): Promise<T> {
  const response = await axiosInstance({
    url,
    method,
    params: queryParams,
  });
  return response.data;
}
export async function saveData<T>(
  { method, url }: APIParameters,
  data?: T
): Promise<UpdateSuccessType> {
  const response = await axiosInstance({
    url,
    method,
    data,
  });
  return response.data;
}
