const Account = require("./account");
const Shop = require("./shop");
const Manager = require("./manager");
const Redis = require("ioredis");
const redis = new Redis();
// Subscribe to keyspace notifications for expired keys
redis.subscribe("__keyevent@0__:expired");

async function tester() {
  const acc = new Account(5000);
  await Promise.all(acc.shops.map((shop) => shop.save()));
  await acc.save();
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

      // Handles purchasing shop, emit current cash and shop amounts back
      if (msg.shopName) {
        console.log(`Shop Name:${msg.shopName} Amount:${msg.amount}`);
        await acc.purchaseShop(msg.shopName, msg.amount);
        const shops = await acc.shops;
        socket1.emit("bar", shops);
        const newCash = await acc.cash;
        socket1.emit("cash", { newCash });
      }

      if (msg === "close") {
        const cash = await acc.cash;
        acc.oldCash = cash;
        await acc.save();
      }
    });

    // Handles cash functions, such as purchase or getting revenue from user click
    socket1.on("cash", async function (msg) {
      async function tick(shop, interval, timerInterval) {
        if (shop.currTime >= shop.timeOut) {
          clearInterval(interval);
          shop.available = true;
          shop.currTime = 0;
        } else {
          shop.currTime = shop.currTime + timerInterval;
        }
        // Adds interval time to currTime every tick
        await shop.save();

        const shops = await Shop.all();
        io1.emit("bar", shops);
      }

      if (msg === "getCash") {
        const newCash = await acc.cash;
        const oldCash = await acc.oldCash;
        const difference = newCash - oldCash;
        socket1.emit("cash", { newCash, difference });
      } else {
        console.log("getCash for shop got called", msg);
        const shop = await Shop.byId(msg);
        await Shop.expire(shop.shopNumber, acc.timerMultiplier);
        shop.available = false;

        let timerInterval = 250;
        // tick(shop, 0, 0);
        let interval = setInterval(
          () => tick(shop, interval, timerInterval),
          timerInterval
        );
      }
    });

    socket1.on("managers", async function (msg) {
      if (msg === "getManagers") {
        const managers = await acc.managers;
        socket1.emit("managers", managers);
      } else {
        console.log("hireManager!");
        await acc.hireManager(msg);
        const managers = await acc.managers;
        socket1.emit("managers", managers);
        const newCash = await acc.cash;
        socket1.emit("cash", { newCash });
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
    acc.cash = shop.revenue * shop.amount * shop.revMultiplier;
    await acc.save();
    io1.emit("cash", { newCash: acc.cash });

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
