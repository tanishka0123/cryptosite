import React, { useContext, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { CryptoContext } from "../../Context";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";

function Login({ handleClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAlert } = useContext(CryptoContext);

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        type: "error",
        message: "Please Fill All the Fields",
      });
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setAlert({
        open: true,
        type: "success",
        message: `Login Successful. Welcome ${result.user.email}`,
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
      />
      <TextField
        variant="outlined"
        type="password"
        label="Enter Password..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
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
        Login
      </Button>
    </Box>
  );
}

export default Login;
