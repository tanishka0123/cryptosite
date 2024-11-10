import styled from "@emotion/styled";
import React from "react";

const StyledSpan = styled("span")(({ selected }) => ({
  border: "1px solid gold",
  borderRadius: 5,
  padding: 10,
  paddingLeft: 20,
  paddingRight: 20,
  fontFamily: "Montserrat",
  cursor: "pointer",
  backgroundColor: selected ? "gold" : "",
  color: selected ? "black" : "",
  fontWeight: selected ? 700 : 500,
  "&:hover": {
    backgroundColor: "gold",
    color: "black",
  },
  width: "22%",
}));

function Button({ children, onClick, selected }) {
  return (
    <StyledSpan onClick={onClick} selected={selected}>
      {children}
    </StyledSpan>
  );
}

export default Button;
