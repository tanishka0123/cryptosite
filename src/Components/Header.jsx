import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Select,
  MenuItem,
  createTheme,
} from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CryptoContext } from "../Context.jsx";
import ModalAuth from "./Authentication/ModalAuth.jsx";
import UserSidebar from "./Authentication/UserSidebar.jsx";

const StyledContainer = styled(Container)({
  display: "flex",
  justifyContent: "space-between",
});

const Title = styled(Typography)({
  flex: 1,
  color: "gold",
  fontFamily: "Montserrat",
  fontWeight: "bold",
  cursor: "pointer",
});

function Header() {
  const navigate = useNavigate();
  const { currency, setCurrency, user } = useContext(CryptoContext);

  const darktheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={darktheme}>
      <AppBar color="transparent" position="static">
        <StyledContainer>
          <Toolbar
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Title variant="h5" onClick={() => navigate("/")}>
              CryptoGram
            </Title>
            <Select
              variant="outlined"
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="INR">INR</MenuItem>
            </Select>
            {user ? <UserSidebar /> : <ModalAuth />}
          </Toolbar>
        </StyledContainer>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
