const Account = require("./account");
const Shop = require("./shop");
// const redis = require('ioredis');
// const io = require('socket.io-client');
const Redis = require("ioredis");
const redis = new Redis();
// Subscribe to keyspace notifications for expired keys
redis.subscribe("__keyevent@0__:expired");

async function tester() {
  const acc = new Account(5000);
  console.log(acc.cash);

  // Server
  var io1 = require("socket.io").listen(8321);

  io1.on("connection", async function (socket1) {
    socket1.on("bar", async function (msg) {
      // Emits current shop info
      if (msg === "getShops") {
        const shops = await acc.shops;
        socket1.emit("bar", shops);
      }

      // Emits current cash amount
      if (msg === "getCash") {
        const cash = await acc.cash;
        socket1.emit("bar", cash);
      }

      // Handles purchasing shop, emit current cash and shop amounts back
      if (msg.shopName) {
        console.log(`Shop Name:${msg.shopName} Amount:${msg.amount}`);
        await acc.purchaseShop(msg.shopName, msg.amount);
        const shops = await acc.shops;
        socket1.emit("bar", shops);
        const cash = await acc.cash;
        socket1.emit("cash", cash);
      }
    });

    // Handles cash functions, such as purchase or getting revenue from user click
    socket1.on("cash", async function (msg) {
      if (msg === "getCash") {
        const cash = await acc.cash;
        socket1.emit("cash", cash);
      } else {
        console.log("getCash got called", msg);
        const shop = await Shop.byId(msg);
        // cannot exp/pexp with a 0 value, so we're adding 1 ms
        await Shop.expire(shop.shopNumber);
      }
    });
  });

  // just emit to all channels
  redis.on("message", async (channel, message) => {
    const id = message.substring(4);
    const shop = await Shop.byId(id);
    console.log(
      `ShopID:${id} called with name:${shop.name}, timeout:${shop.timeout}`
    );
    acc.cash = shop.revenue;
    const cash = await acc.cash;
    console.log(cash);
    io1.emit("cash", cash);
  });

  // need a loop here to check if it is autoed
  redis.on("message", async (channel, message) => {
    if (message.substring(4) == "2") {
      //Shop.expire expects an integer so we have to convert
      let num = parseInt(message.substring(4));
      console.log("Repeating!");

      await Shop.expire(num);
    }
  });
}

tester();
