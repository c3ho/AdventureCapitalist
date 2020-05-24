const { redis } = require ('../lib/redis');
const channel = 'game'
const gameKey = 'adventureCapitalist'
// Shop set
const shops = 't:shops'
const managers = 't:managers'

redis.on("ready", () => {
    redis.config("SET", "notify-keyspace-events", "Ex")
})

// All functions here return a promise
module.exports = {
    subscribe: () => redis.subscribe(channel),

    expire: (id, time) => redis.pexpire(id, time),

    // Adds a shop to the database
    addShop: async(shop) => {
        const shopKey = shop.shopNumber.toString();
        await redis
            .multi()
            .hmset(
                shopKey,
                'shopNumber',
                shop.shopNumber,
                'name',
                shop.name,
                'amount',
                shop.amount,
                'cost',
                shop.cost,
                'revenue',
                shop.revenue,
                'timeout',
                shop.timeout,
                'coefficient',
                shop.coefficient,
                'currCost',
                shop.currCost,
                'revMultiplier',
                shop.revMultiplier,
                'baseTimerMultiplier',
                shop.baseTimerMultiplier,
                'available',
                shop.available.toString(),
                'currTime',
                shop.currTime
            )
            .sadd(shops, shop.shopNumber)
            .exec();
    },

    // Returns all keys of shops
    getShops: () => redis.smembers(shops),

    // Returns information of a specific shop
    getShop: (id) => redis.hgetall(id),

    // Returns time to live for specified key
    timeLeft: (id) => redis.pttl(id),

    // Adds the account to database
    addAccount: async (account) => {
        await redis
            .multi()
            .hmset(
                gameKey,
                'cash',
                account.cash,
                'timerMultiplier',
                account.timerMultiplier,
                'revenueMultiplier',
                account.revenueMultiplier,
                'minShopAmount',
                account.minShopAmount
            )
            .exec()
    },

    // Adds the manager to database
    addManager: async (manager) => {
        const managerKey = manager.managerNum.toString(); 
        await redis
            .multi()
            .hmset(
                managerKey,
                'managerNum',
                manager.managerNum,
                'managerName',
                manager.name,
                'business',
                manager.business,
                'managerCost',
                manager.cost,
                'managerHired',
                manager.hired.toString(),
            )
            .sadd(managers, manager.managerNum)
            .exec()
    },

    // Returns keys of managers in the database
    getManagers: () => redis.smembers(managers),

    // Returns information for a specific manager in the database
    getManager: (id) => redis.hgetall(id),
}