import React, { useContext, useEffect, useState } from "react";
import { CryptoContext } from "../Context";
import {
  Container,
  createTheme,
  LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "./Carousel";

function Coinstable() {
  const { coins, loading, currency, symbol,fetchData } = useContext(CryptoContext);

  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  const handleFilter = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(input.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(input.toLowerCase())
    );
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <Container
        style={{
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          style={{
            margin: 18,
            fontFamily: "Montserrat",
          }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search For a Crypto Currency..."
          variant="outlined"
          style={{ marginBottom: 20, width: "90%" }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24 Change", "Market Cap"].map((head) => (
                    <TableCell
                      key={head}
                      style={{
                        fontSize: 20,
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleFilter()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h >= 0;
                    return (
                      <TableRow
                        onClick={() => navigate(`/coins/:${row.id}`)}
                        key={row.name}
                        style={{
                          cursor: "pointer",
                          backgroundColor: "#16171a",
                          fontFamily: "Montserrat",
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="59"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgray" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right" style={{ height: "59" }}>
                          {symbol}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color:
                              profit > 0
                                ? "hsl(156.5079365079365, 87.09677419354837%, 42.549019607843135%)"
                                : "red",
                            fontWeight: 500,
                            height: "59",
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right" style={{ height: "59" }}>
                          {symbol}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}{" "}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          count={(handleFilter()?.length / 10).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
}

export default Coinstable;
