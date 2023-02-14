import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import React from "react";
const ToastAlert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Alert: React.FC<{ severity: AlertColor; open: boolean, message: string }> = ({
  severity,
  open,
  message
}) => {
  return (
    <Snackbar open={open} autoHideDuration={4000}>
      <ToastAlert severity={severity} sx={{ width: "100%" }}>
        {message}
      </ToastAlert>
    </Snackbar>
  );
};
