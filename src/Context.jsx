import { createContext, useEffect, useState } from "react";

const CryptoContext = createContext();

function ContextProvider({ children }) {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");

  useEffect(() => {
    setSymbol(currency === "INR" ? "₹" : "$");
  }, [currency]);

  return (
    <CryptoContext.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </CryptoContext.Provider>
  );
}

export { CryptoContext, ContextProvider };
