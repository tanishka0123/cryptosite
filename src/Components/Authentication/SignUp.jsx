import { Box, Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { CryptoContext } from "../../Context";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";

function SignUp({ handleClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setAlert } = useContext(CryptoContext);

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        type: "error",
        message: "Passwords do not match!",
      });
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setAlert({
        open: true,
        type: "success",
        message: `Sign Up Successfull. Welcome ${result.user.email}`,
      });
      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        type: "error",
        message: error.message,
      });
      return;
    }
  };

  return (
    <Box
      p={3}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        backgroundColor: "#3030303d",
      }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      ></TextField>
      <TextField
        variant="outlined"
        type="password"
        label="Enter Password..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      ></TextField>
      <TextField
        variant="outlined"
        type="password"
        label="Confirm Password..."
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      ></TextField>
      <Button
        variant="contained"
        size="large"
        style={{
          width: "70%",
          backgroundColor: "#EEBC1D",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
        }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  );
}

export default SignUp;
