import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { CryptoContext } from "../../Context";
import { Avatar, Button } from "@mui/material";
import styled from "@emotion/styled";
import { signOut } from "firebase/auth";
import { auth, db } from "../../config/firebaseConfig";
import { numberWithCommas } from "../Carousel";
import DeleteIcon from "@mui/icons-material/Delete";
import { doc, setDoc } from "firebase/firestore";

const SidebarContainer = styled("div")({
  width: 350,
  padding: 25,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  fontFamily: "monospace",
});

const ContentContainer = styled("div")({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
  height: "92%",
});

const WatchList = styled("div")({
  flex: 1,
  width: "100%",
  backgroundColor: "grey",
  borderRadius: 10,
  padding: 15,
  paddingTop: 10,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 12,
  overflowY: "auto",
  scrollbarWidth: "thin", 
  scrollbarColor: "#888 #eee",
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#eee",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#888",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#555",
  },
});


const StyledDiv = styled("div")({
  padding: 10,
  borderRadius: 5,
  color: "black",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#EEBC1D",
  boxShadow: "0 0 3px black",
  fontSize:14,
});

export default function UserSidebar() {
  const [state, setState] = React.useState({
    right: false,
  });

  const { user, setAlert, watchlist, coins, symbol } =
    React.useContext(CryptoContext);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const logOut = () => {
    signOut(auth);

    setAlert({
      open: true,
      type: "success",
      message: "Logged out successfully",
    });

    toggleDrawer();
  };

  const RemoveFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        {
          coins: watchlist.filter((watch) => watch !== coin?.id),
        },
        { merge: "true" }
      );
      setAlert({
        open: true,
        message: `${coin.name} Removed from the Wishlist!!`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };
  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            sx={{
              height: 38,
              width: 38,
              cursor: "pointer",
              backgroundColor: "#EEBC1D",
            }}
            src={user?.photoURL || "./default-avatar.png"} // Fallback to default avatar
            alt={user?.displayName || user?.email}
          />

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <SidebarContainer>
              <ContentContainer>
                <Avatar
                  src={user?.photoURL || "./default-avatar.png"}
                  alt={user?.displayName || user?.email}
                  sx={{
                    height: 200,
                    width: 200,
                    cursor: "pointer",
                    backgroundColor: "#EEBC1D",
                    objectFit: "contain",
                  }}
                />
                <span
                  style={{
                    width: "100%",
                    fontSize: 20,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                  }}
                >
                  {user?.displayName || user?.email}
                </span>
                <WatchList>
                  <span
                    style={{
                      fontSize: 15,
                      textShadow: "0 0 5px black",
                    }}
                  >
                    WatchList
                  </span>
                  {coins.map((coin) => {
                    if (watchlist.includes(coin.id))
                      return (
                        <StyledDiv key={coin.id}>
                          <span>{coin.name}</span>
                          <span style={{ display: "flex", gap: 8 }}>
                            {symbol}
                            {numberWithCommas(coin.current_price.toFixed(2))}
                            <DeleteIcon
                              style={{ cursor: "pointer", fontSize: "16" }}
                              onClick={() => RemoveFromWatchlist(coin)}
                            />
                          </span>
                        </StyledDiv>
                      );
                    return null;
                  })}
                </WatchList>
              </ContentContainer>
              <Button
                style={{
                  height: "8%",
                  width: "100%",
                  backgroundColor: "#EEBC1D",
                  marginTop: 20,
                  fontSize: 18,
                }}
                variant="contained"
                onClick={logOut}
              >
                Log Out
              </Button>
            </SidebarContainer>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
