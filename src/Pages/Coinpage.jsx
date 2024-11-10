import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoContext } from "../Context";
import axios from "axios";
import styled from "@emotion/styled";
import CoinInfo from "../Components/CoinInfo";
import { LinearProgress, Typography } from "@mui/material";
import ReactHtmlParser from "react-html-parser";
import { numberWithCommas } from "../Components/Carousel";

const StyledDiv = styled("div")({
  display: "flex",
  flexDirection: "row",
  "@media (max-width: 960px)": {
    flexDirection: "column",
    alignItems: "center",
  },
});

const Sidebar = styled("div")({
  padding: 4,
  width: "30%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 25,
  borderRight: "2px solid grey",
  "@media (max-width:1000px)": {
    width: "100%",
    borderRight: "none",
  },
});

const MarketData = styled("div")({
  alignSelf: "start",
  padding: 25,
  paddingTop: 10,
  width: "100%",

  "@media (max-width:1492px)": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  "@media (max-width:1000px)": {
    flexDirection: "column",
    alignItems: "center",
  },

  "@media (max-width:550px)": {
    alignItems: "start",
  },
});

function Coinpage() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const { currency, symbol } = useContext(CryptoContext);

  const fetchCoin = async () => {
    try {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id.replace(":", "")}`
      );

      setCoin(data);
    } catch (error) {
      console.error("Error fetching coin data:", error);
    }
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  if (!coin)
    return (
      <LinearProgress style={{ backgroundColor: "gold" }}> </LinearProgress>
    );

  return (
    <StyledDiv>
      <Sidebar>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography
          style={{
            fontWeight: "bold",
            marginBottom: 20,
            fontFamily: "Montserrat",
          }}
          variant="h3"
        >
          {coin?.name}
        </Typography>
        <Typography
          variant="subtitle1"
          style={{
            width: "100%",
            fontFamily: "Montserrat",
            padding: 25,
            paddingBottom: 15,
            paddingTop: 0,
            textAlign: "center",
          }}
        >
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}
        </Typography>
        <MarketData>
          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              style={{ fontWeight: "bold", color: "gold" }}
            >
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              style={{ fontWeight: "bold", color: "gold" }}
            >
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {symbol}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              style={{ fontWeight: "bold", color: "gold" }}
            >
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {symbol}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              &nbsp;M
            </Typography>
          </span>
        </MarketData>
      </Sidebar>
      <CoinInfo coin={coin} />
    </StyledDiv>
  );
}

export default Coinpage;
