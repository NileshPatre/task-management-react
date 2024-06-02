import React from "react";
import CustomForm from "../CustomForm";
import { saveData } from "../../services/apis";
import { toast } from "react-toastify";
import styles from "./index.module.css";
import { TasksType } from "../TaskList/types";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
const CreateTask = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
  });

  async function onSubmit(formData: Partial<TasksType>) {
    try {
      const response = await saveData<Partial<TasksType>>(
        {
          method: "POST",
          url: "/task-management/createTask",
        },
        formData
      );
      if (response.success) {
        toast.success("Task created successful");
        navigate("/tasks/list");
      } else {
        throw new Error();
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message.toString());
      } else {
        toast.error("An error occurred during task create");
      }
    }
  }
  return (
    <>
      <Link to="/tasks/list">
        <div className={styles.backLink}>Task List</div>
      </Link>
      <CustomForm
        validationSchema={validationSchema}
        type="Create"
        formData={{}}
        onSubmit={onSubmit}
        onClose={() => {
          navigate("/tasks/list");
        }}
        header={"Create Task"}
      />
    </>
  );
};

export default CreateTask;
