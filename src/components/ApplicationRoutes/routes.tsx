import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import TaskList from "../TaskList";
import CreateTask from "../CreateTask";
import UpdateTask from "../UpdateTask";
import SignIn from "../SignIn";
import Register from "../Register";
import PrivateRoute from "./privateRoutes";
import { AppDataProvider } from "../../contexts/appDataContext";
const ApplicationRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route
          path="/tasks/list"
          element={<PrivateRoute element={<TaskList />} />}
        />
        <Route
          path="/tasks/create"
          element={
            <PrivateRoute
              element={
                <AppDataProvider>
                  <CreateTask />
                </AppDataProvider>
              }
            />
          }
        />
        <Route
          path="/tasks/edit/:id"
          element={
            <PrivateRoute
              element={
                <AppDataProvider>
                  <UpdateTask />
                </AppDataProvider>
              }
            />
          }
        />
        <Route path="*" element={<Navigate to="/tasks/list" />} />
      </Routes>
    </Router>
  );
};

export default ApplicationRoutes;
