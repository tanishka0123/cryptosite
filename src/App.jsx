import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Homepage from "./Pages/Homepage";
import Coinpage from "./Pages/Coinpage";
import styled from "@emotion/styled";
import Alert from "./Components/Alert";

function App() {
  const StyledDiv = styled("div")({
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  });
  return (
    <BrowserRouter>
      <StyledDiv>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Homepage />} exact></Route>
          <Route path="/coins/:id" element={<Coinpage />}></Route>
        </Routes>
        <Alert/>
      </StyledDiv>
    </BrowserRouter>
  );
}

export default App;
