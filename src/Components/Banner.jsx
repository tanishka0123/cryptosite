import styled from "@emotion/styled";
import { Container, Typography } from "@mui/material";
import React from "react";
import Carousel from "./Carousel";

const StyledDiv = styled("div")`
  background-image: url(./banner2.jpg);
  width: 100%;
  background-size: cover;
  background-position: center;

  .bannerContent {
    height: 400px;
    display: flex;
    flex-direction: column;
    padding-top: 25px;
    justify-content: space-around;
  }
  .tagline {
    display: flex;
    height: 40%;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
`;

function Banner() {
  return (
    <StyledDiv>
      <div className="bannerContent">
        <div className="tagline">
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            Crypto Hunter
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all info regarding your favorite Crypto Currency
          </Typography>
        </div>
        <Carousel />
      </div>
      
    </StyledDiv>
  );
}

export default Banner;
