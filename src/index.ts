import Account from './backend/data/account'

let game: Account = new Account(0);

// Testing stuff here
console.log(game.shops);
game.upgradeShop('Pizza Delivery', 3);