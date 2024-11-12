import React, { useContext } from "react";
import { CryptoContext } from "../Context";
import { Snackbar, Alert as MuiAlert } from "@mui/material";

function Alert() {
  const { alert, setAlert } = useContext(CryptoContext);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ open: false });
  };
  return (
    <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
      <MuiAlert
        onClose={handleClose}
        elevation={10}
        variant="filled"
        severity={alert.type}
      >
        {alert.message}
      </MuiAlert>
    </Snackbar>
  );
}

export default Alert;
