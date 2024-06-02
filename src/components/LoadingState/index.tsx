import React from "react";
import "./loadingState.css";
interface Props {
  message: string;
}
const LoadingState: React.FC<Props> = ({ message }) => {
  return (
    <div className="loading-state-component">
      <h2>{message}</h2>
    </div>
  );
};

export default LoadingState;
