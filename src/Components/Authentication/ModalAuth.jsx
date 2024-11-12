import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { AppBar, Tab, Tabs } from "@mui/material";
import Login from "./Login";
import SignUp from "./SignUp";
import styled from "@emotion/styled";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { CryptoContext } from "../../Context";
import { auth } from "../../config/firebaseConfig";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
};

const GoogleBox = styled(Box)({
  padding: 24,
  paddingTop: 0,
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  gap: 20,
  fontSize: 20,
});

export default function ModalAuth() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const { setAlert } = React.useContext(CryptoContext);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e, val) => setValue(val);

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          type: "success",
          message: `Sign Up Successful. Welcome ${res.user.email}`,
        });
        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          type: "error",
          message: error.message,
        });
        return;
      });
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{
          width: 85,
          height: 40,
          backgroundColor: "#EEBC1D",
        }}
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <AppBar
              position="static"
              style={{
                backgroundColor: "transparent",
                color: "white",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="primary"
                textColor="inherit"
                sx={{
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#EEBC1D",
                  },
                  borderRadius: 1,
                }}
              >
                <Tab label="Login"></Tab>
                <Tab label="Sign Up"></Tab>
              </Tabs>
            </AppBar>
            {value === 0 ? (
              <Login handleClose={handleClose} />
            ) : (
              <SignUp handleClose={handleClose} />
            )}
            <GoogleBox>
              <span
                style={{
                  paddingTop: 24,
                  color: "#EEBC1D",
                  fontFamily: "monospace",
                }}
              >
                OR
              </span>
              <GoogleButton
                style={{ width: "100%", outline: "none" }}
                onClick={signInWithGoogle}
              />
            </GoogleBox>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
