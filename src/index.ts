import Account from './backend/data/account'

let game: Account = new Account(0);
let n: number = 0;
let allItems = {
    wood: 0,
    planks: 0,
    stone: 0
}

function getItem(item) {
    allItems[item] = setInterval(function() {
        n += 7;
        console.log(`${item}: ${n}`)
    }, 2000);
}


// Testing stuff here
// console.log(game.shops);
game.upgradeShop('Pizza Delivery', 3);
game.upgradeShop('Car Wash', 3);
// console.log(game.cash);
game.hireManager('Mama Sean');
game.hireManager('W.W. Heisenbird');
