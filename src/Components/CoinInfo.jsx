import React, { useContext, useEffect, useState } from "react";
import { CryptoContext } from "../Context";
import { HistoricalChart } from "../config/Api";
import axios from "axios";
import { ThemeProvider } from "@emotion/react";
import { CircularProgress, createTheme } from "@mui/material";
import styled from "@emotion/styled";
import { Line } from "react-chartjs-2";
import Button from "../Components/Button";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  elements,
} from "chart.js";
import { chartDays } from "../config/Days";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const StlyedDiv = styled("div")({
  width: "70%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 25,
  padding: 40,
  "@media (max-width:960px)": {
    width: "100%",
    height: "100%",
    marginTop: 0,
    padding: 20,
    paddingTop: 0,
  },
});

function CoinInfo({ coin }) {
  const [historyData, setHistoryData] = useState(null);
  const [days, setDay] = useState(1);
  const { currency } = useContext(CryptoContext);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        HistoricalChart(coin.id, days, currency)
      );
      setHistoryData(data.prices);
    } catch (error) {
      console.error("Error fetching coin data:", error);
    }
  };

  const darktheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  useEffect(() => {
    fetchData();
  }, [currency, days]);

  return (
    <ThemeProvider theme={darktheme}>
      <StlyedDiv>
        {!historyData ? (
          <CircularProgress
            style={{
              color: "gold",
            }}
            size={50}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historyData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historyData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <Button
                  key={day.value}
                  onClick={() => setDay(day.value)}
                  selected={day.value === days}
                >
                  {day.label}
                </Button>
              ))}
            </div>
          </>
        )}
      </StlyedDiv>
    </ThemeProvider>
  );
}

export default CoinInfo;
