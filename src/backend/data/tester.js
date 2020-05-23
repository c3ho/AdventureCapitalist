const Account = require('./account');
// const redis = require('ioredis');
// const io = require('socket.io-client');
const Redis = require('ioredis');

async function tester() {
    const redis = new Redis();

    // Subscribe to keyspace notifications for expired keys
    redis.subscribe("__keyevent@0__:expired");
    redis.on('message', async (channel, message) => {
        console.log(message);
    })

    const acc = new Account(5000)
    console.log(acc.cash);
    
    // Server
    var io1 = require('socket.io').listen(8321);

    io1.on('connection', async function(socket1) {

        socket1.on('bar', async function(msg) {
            // Emits current shop info
            if (msg === 'getShops'){
                const shops = await acc.shops;
                socket1.emit('bar', shops);
            } 
            
            // Emits current cash amount
            if (msg === 'getCash'){
                const cash = await acc.cash
                socket1.emit('bar', cash)
            }
            
            // Handles purchasing shop, emit current cash and shop amounts back
            if (msg.shopName) {
                console.log(`Shop Name:${msg.shopName} Amount:${msg.amount}`);
                await acc.purchaseShop(msg.shopName, msg.amount)
                const shops = await acc.shops;
                socket1.emit('bar', shops);
                const cash = await acc.cash
                socket1.emit('cash', cash);
            }
        })

        // Handles cash functions, such as purchase or getting revenue from user click
        socket1.on('cash', async function(msg) {
            if (msg === 'getCash'){
                const cash = await acc.cash;
                socket1.emit('cash', cash);
            } else {
                console.log(msg);
                acc.cash = msg;
                const cash = await acc.cash
                socket1.emit('cash', cash)
            }
        })

    });  
}

tester();

// console.log(acc.shops);