import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { CoinList } from "./config/Api";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./config/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";

const CryptoContext = createContext();

function ContextProvider({ children }) {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
    } catch (error) {
      console.error("Error fetching coins", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSymbol(currency === "INR" ? "₹" : "$");
  }, [currency]);

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user.uid);
      const unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          setWatchlist(coin.data().coins);
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  return (
    <CryptoContext.Provider
      value={{
        currency,
        symbol,
        setCurrency,
        coins,
        loading,
        fetchData,
        alert,
        setAlert,
        user,
        watchlist,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
}

export { CryptoContext, ContextProvider };
