import Manager from "./manager";
import Shop from './shop';

export default class Account {
    _cash: number;
    _shops: Shop[];
    _upgrades: [];
    _managers: Manager[];
    _managedShops: string[] = [];
    // _investors: [];

    // make a new account from scratch
    constructor(cash: number = 0, shops: Shop[] = [], managers: Manager[] = []) {
        this._cash = cash;

        // If new account create shop objects and assign to array
        if (shops.length === 0) {
            let newShops: Shop[] = [];

            let shop: Shop = new Shop('Lemonade', 0, 1, 3.738, 1.07, 0);
            newShops.push(shop);
            
            shop = new Shop('Newspaper Delivery', 0, 60, 60, 1.15, 3);
            newShops.push(shop);

            shop = new Shop('Car Wash', 0, 540, 720, 1.14, 6);
            newShops.push(shop);

            shop = new Shop('Pizza Delivery', 0, 4320, 8640, 1.13, 12)
            newShops.push(shop)

            shop = new Shop('Donut Shop', 0, 4320, 103680, 1.12, 24)
            newShops.push(shop)

            shop = new Shop('Shrimp Boat', 0, 622080, 1244160, 1.11, 96)
            newShops.push(shop)

            shop = new Shop('Hockey Team', 0, 7464960, 14929920, 1.10, 384)
            newShops.push(shop)

            shop = new Shop('Movie Studio', 0, 89579520, 179159040, 1.09, 1536)
            newShops.push(shop)

            shop = new Shop('Bank', 0, 1074954240, 2149908480, 1.08, 6144)
            newShops.push(shop)

            shop = new Shop ('Oil Company', 0, 29668737024, 25798901760, 1.07, 36864)
            newShops.push(shop)

            this._shops = newShops;
        }

        // If new account create manager objects and assign to array
        if (managers.length === 0) {
            let newManagers: Manager[] = [];

            let manager: Manager = new Manager('Cabe Johnson', 'Lemonade', 1000, false)
            newManagers.push(manager);

            manager = new Manager('Perry Black', 'Newspaper Delivery', 15000, false);
            newManagers.push(manager);

            manager = new Manager('W.W. Heisenbird', 'Car Wash', 100000, false);
            newManagers.push(manager);

            manager = new Manager('Mama Sean', 'Pizza Delivery', 500000, false);
            newManagers.push(manager);

            manager = new Manager('Jim Thorton', 'Donut Shop', 1200000, false);
            newManagers.push(manager);

            manager = new Manager('Forest Trump', 'Shrimp Boat', 10000000, false);
            newManagers.push(manager);

            manager = new Manager('Dawn Cheri', 'Hockey Team', 111111111, false);
            newManagers.push(manager);

            manager = new Manager('Stefani Speilburger', 'Movie Studio', 555555555, false);
            newManagers.push(manager)

            manager = new Manager('The Dark Lord', 'Bank', 10000000000, false);
            newManagers.push(manager);

            manager = new Manager('Derrick Plainview', 'Oil Company', 100000000000, false);
            newManagers.push(manager);

            this._managers = newManagers;
        }
    }

    get cash() {
        return this._cash;
    }

    set cash(cash: number) {
        this._cash += cash;
    }

    get upgrades() {
        return this._upgrades;
    }

    get managers() {
        return this._managers;
    }

    get shops() {
        return this._shops;
    }

    set managedShops(shopName: string) {
        console.log(shopName);
        if (shopName) {
            this._managedShops.push(shopName)
        }
    } 

    upgradeShop(shopName: string, amount: number) {
        const index: number = this.shops.findIndex((shop: Shop) => shop.name == shopName);
        // index not found
        if (index < 0) {
            return;
        }
        console.log(index);
        this.cash = -1 * this.shops[index].purchase(amount);
    }
    
    hireManager(managerName: string) {
        let index: number = this.managers.findIndex((manager: Manager) => manager.name == managerName);
        // index not found
        if (index < 0) {
            return;
        }
        // get name of the shop 
        // its 1 : 1 index for managers + shops
        this.managedShops = this.shops[index].name
        // auto the business
        this.autoBusiness(this.shops[index]);
        // const auto = setInterval(this.cash = revenue, interval);
    }

    // Auto Manage business
    autoBusiness(shop: Shop) {
        this._managedShops[shop.name] = setInterval(() => {
            this.cash = shop.revenue;
            console.log(`${shop.name}: ${this.cash}`);
        }, shop.timeout * 1000);
    } 
}