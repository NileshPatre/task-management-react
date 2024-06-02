import React from "react";
import "./App.css";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApplicationRoutes from "./components/ApplicationRoutes/routes";
function App() {
  return (
    <div>
      <Header />
      <ApplicationRoutes />
      <ToastContainer />
    </div>
  );
}

export default App;
