import React from "react";
import { Alert } from "@mui/material";
import { AlertProps } from "../interface";

const AlertComponent: React.FC<AlertProps> = ({ message, severity, onClose }) => {
  return (
    <Alert className="alert" onClose={onClose} severity={severity}>
      {message}
    </Alert>
  );
};

export default AlertComponent;
