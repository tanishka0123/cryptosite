import styled from "@emotion/styled";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { CryptoContext } from "../Context";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const StyledDiv = styled("div")({
  display: "flex",
  alignItems: "center",
  height: "50%",
  position: "relative",
});

const CoinItem = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  cursor: "pointer",
  textTransform: "uppercase",
  color: "white",
  margin: "10px",
  padding: "15px",
  borderRadius: "10px",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const CoinLogo = styled("img")({
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  marginBottom: "10px",
});

const CoinText = styled("span")({
  fontSize: "14px",
  fontWeight: "bold",
  color: "gold",
});

const PriceText = styled("span")({
  fontSize: "22px",
  fontWeight: "500",
  color: "white",
});

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Carousel() {
  const { currency, symbol } = useContext(CryptoContext);
  const [trending, setTrending] = useState([]);

  const fetchCoins = async () => {
    try {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
      );
      setTrending(data);
    } catch (error) {
      console.error("Error fetching coins", error);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <div>
        <div key={coin.id}>
          <Link to={`/coins/${coin.id}`}>
            <CoinItem>
              <CoinLogo src={coin?.image} alt={coin.name} />
              <CoinText>
                {coin?.symbol}&nbsp;
                <span style={{ color: profit ? "green" : "red" }}>
                  {profit && "+"}
                  {coin?.price_change_percentage_24h?.toFixed(2)}%
                </span>
              </CoinText>
              <PriceText>
                {symbol}
                {numberWithCommas(coin?.current_price.toFixed(2))}
              </PriceText>
            </CoinItem>
          </Link>
        </div>
      </div>
    );
  });

  const responsive = {
    0: { items: 2 },
    450: { items: 3 },
    700: { items: 4 },
    1000: { items: 5 },
  };

  return (
    <StyledDiv>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </StyledDiv>
  );
}

export default Carousel;
