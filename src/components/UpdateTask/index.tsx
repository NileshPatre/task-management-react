import React from "react";
import CustomForm from "../CustomForm";
import { useQuery } from "react-query";
import { fetchData, saveData } from "../../services/apis";
import { toast } from "react-toastify";
import styles from "./index.module.css";
import { TasksType } from "../TaskList/types";
import { useParams } from "react-router-dom";
import DetailsCard from "../DetailsCard";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
const UpdateTask = () => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    status: Yup.object().shape({
      id: Yup.string().required("Status ID is required"),
      label: Yup.string().required("Status label is required"),
      name: Yup.string().required("Status name is required"),
    }),
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useQuery<TasksType, Error>(["taskDetails", id], () =>
    fetchData<TasksType>(
      {
        method: "GET",
        url: "/task-management/getTaskDetails",
      },
      { id }
    )
  );
  async function onSubmit(formData: Partial<TasksType>) {
    try {
      const response = await saveData<Partial<TasksType>>(
        {
          method: "PUT",
          url: "/task-management/updateTask",
        },
        formData
      );
      if (response.success) {
        toast.success("Task updated successful");
        navigate("/tasks/list");
      } else {
        throw new Error();
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message.toString());
      } else {
        toast.error("An error occurred during task update");
      }
    }
  }
  return data ? (
    <>
      <Link to="/tasks/list">
        <div className={styles.backLink}>Task List</div>
      </Link>
      <DetailsCard
        details={[
          { label: "id", value: data.id },
          {
            label: "Created at",
            value: moment(data.createdAt).format("YYYY/MM/DD"),
          },
          {
            label: "Updated at",
            value: moment(data.updatedAt).format("YYYY/MM/DD"),
          },
        ]}
        header="Task Details"
      />
      <CustomForm
        validationSchema={validationSchema}
        type="Update"
        formData={data}
        onSubmit={onSubmit}
        onClose={() => {
          navigate("/tasks/list");
        }}
        header={"Update Task"}
      />
    </>
  ) : (
    <></>
  );
};

export default UpdateTask;
