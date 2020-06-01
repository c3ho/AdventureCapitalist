import React, { useEffect, useState } from "react";
// import Shop from "../backend/data/shop";
import ShopItem from "./Shop";
import { Container } from "@material-ui/core";
var io2 = require("socket.io-client");
var socket2 = io2.connect("http://localhost:8321");

export default function TestComponent() {
  const [shops, setShops] = useState([]);
  const [cash, setCash] = useState(0);

  // On component mount, subscribe to webserver and get current cash and shop amounts
  useEffect(() => {
    socket2 = io2.connect("http://localhost:8321");

    socket2.emit("bar", "getShops");
    socket2.on("bar", (msg) => {
      setShops(msg);
      console.log("received msg", msg);
    });

    socket2.emit("cash", "getCash");
    socket2.on("cash", (msg) => {
      setCash(msg);
    });
    // Clean up
    return () => socket2.off;
  }, []);

  // Handles user clicking to purchase shop
  function handlePurchaseClick(shopName, amount) {
    const purchase = { shopName, amount };
    socket2.emit("bar", purchase);
  }

  // Handles user clicking of shops to get revenue
  function handleRevenueClick(shopId) {
    socket2.emit("cash", shopId);
  }

  // Mapping function to display all shops
  // Revenue is currently returning even when amount == 0
  const listShops =
    shops.length > 0
      ? shops.map((shop) => {
          // Need to investigate alternative
          // Have to use the data passed instead of Shop object to get costs to re-render
          return (
            <ShopItem
              key={shop._shopNumber}
              // item={tempShop}
              item={shop}
              // click={(e) => handlePurchaseClick(tempShop._name, 1)}
              click={(e) => handlePurchaseClick(shop._name, 1)}
              isGetDisabled={shop._available}
              isDisabled={shop._currCost > cash}
              // revClick={(e) => handleRevenueClick(tempShop._shopNumber)}
              revClick={(e) => handleRevenueClick(shop._shopNumber)}
              cost={shop._currCost}
              currTime={shop._currTime}
            />
          );
        })
      : null;

  return (
    <div>
      <Container>{cash}</Container>
      <Container>{listShops}</Container>
    </div>
  );
}
