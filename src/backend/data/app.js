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
  await Promise.all(acc.shops.map((shop) => shop.save()));
  console.log(acc.cash);

  // Server
  const io1 = require("socket.io").listen(8321);
  const io2 = require("socket.io-client")("http://localhost:8321");

  io1.on("connection", async function (socket1) {
    socket1.on("bar", async function (msg) {
      // Emits current shop info
      if (msg === "getShops") {
        const shops = await Shop.all();
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
        console.log("getCash for shop got called", msg);
        const shop = await Shop.byId(msg);
        await Shop.expire(shop.shopNumber, acc.timerMultiplier);
        shop.available = false;
        let timerInterval = 250;

        let interval = setInterval(async () => {
          if (shop.currTime >= shop.timeOut) {
            clearInterval(interval);
            shop.available = true;
            shop.currTime = 0;
            await shop.save();
          }
          shop.currTime = shop.currTime + timerInterval;
          await shop.save();

          const shops = await Shop.all();
          io1.emit("bar", shops);
        }, timerInterval);
      }
    });
  });

  // just emit to all channels when timeout is completed
  redis.on("message", async (channel, message) => {
    const id = message.substring(9);
    const shop = await Shop.byId(id);
    console.log(
      `ShopID:${id} called with name:${shop.name}, timeout:${shop.timeout}`
    );

    shop.available = true;
    await shop.save();
    acc.cash = shop.revenue;
    const cash = await acc.cash;
    console.log(cash);
    io1.emit("cash", cash);

    // Testing auto for "car wash" shop here
    if (message.substring(9) == "2") {
      //Shop.expire expects an integer so we have to convert
      let num = parseInt(message.substring(9));
      console.log("Repeating!");

      //Using client socket instance, call the click action again
      io2.emit("cash", 2);
    }
  });
}

tester();
