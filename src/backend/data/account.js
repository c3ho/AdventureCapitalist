const Manager = require("./manager");
const Shop = require("./shop");
const Upgrade = require("./upgrade");
const { addAccount } = require("../utils/storage");

class Account {
  // make a new account from scratch
  constructor(
    cash = 0,
    shops = [],
    managers = [],
    upgrades = [],
    managedShops = [],
    oldCash = 0
  ) {
    this._cash = cash;

    // If new account create shop objects and assign to array
    if (shops.length === 0) {
      let newShops = [];

      let shop = new Shop(0, "Lemonade", 0, 1, 3.738, 1.07, 0.5 * 1000, 1, 1);
      newShops.push(shop);

      shop = new Shop(1, "Newspaper Delivery", 0, 60, 60, 1.15, 3 * 1000, 1, 1);
      newShops.push(shop);

      shop = new Shop(2, "Car Wash", 0, 540, 720, 1.14, 6 * 1000, 1, 1);
      newShops.push(shop);

      shop = new Shop(
        3,
        "Pizza Delivery",
        0,
        4320,
        8640,
        1.13,
        12 * 1000,
        1,
        1
      );
      newShops.push(shop);

      shop = new Shop(4, "Donut Shop", 0, 4320, 103680, 1.12, 24 * 1000, 1, 1);
      newShops.push(shop);

      shop = new Shop(
        5,
        "Shrimp Boat",
        0,
        622080,
        1244160,
        1.11,
        96 * 1000,
        1,
        1
      );
      newShops.push(shop);

      shop = new Shop(
        6,
        "Hockey Team",
        0,
        7464960,
        14929920,
        1.1,
        384 * 1000,
        1,
        1
      );
      newShops.push(shop);

      shop = new Shop(
        7,
        "Movie Studio",
        0,
        89579520,
        179159040,
        1.09,
        1536 * 1000,
        1,
        1
      );
      newShops.push(shop);

      shop = new Shop(
        8,
        "Bank",
        0,
        1074954240,
        2149908480,
        1.08,
        6144 * 1000,
        1,
        1
      );
      newShops.push(shop);

      shop = new Shop(
        9,
        "Oil Company",
        0,
        29668737024,
        25798901760,
        1.07,
        36864 * 1000,
        1,
        1
      );
      newShops.push(shop);

      this._shops = [...newShops];
    }

    // If new account create manager objects and assign to array
    if (managers.length === 0) {
      let newManagers = [];

      let manager = new Manager(11, "Cabe Johnson", "Lemonade", 1000, false);
      newManagers.push(manager);

      manager = new Manager(
        12,
        "Perry Black",
        "Newspaper Delivery",
        15000,
        false
      );
      newManagers.push(manager);

      manager = new Manager(13, "W.W. Heisenbird", "Car Wash", 100000, false);
      newManagers.push(manager);

      manager = new Manager(14, "Mama Sean", "Pizza Delivery", 500000, false);
      newManagers.push(manager);

      manager = new Manager(15, "Jim Thorton", "Donut Shop", 1200000, false);
      newManagers.push(manager);

      manager = new Manager(16, "Forest Trump", "Shrimp Boat", 10000000, false);
      newManagers.push(manager);

      manager = new Manager(17, "Dawn Cheri", "Hockey Team", 111111111, false);
      newManagers.push(manager);

      manager = new Manager(
        18,
        "Stefani Speilburger",
        "Movie Studio",
        555555555,
        false
      );
      newManagers.push(manager);

      manager = new Manager(19, "The Dark Lord", "Bank", 10000000000, false);
      newManagers.push(manager);

      manager = new Manager(
        20,
        "Derrick Plainview",
        "Oil Company",
        100000000000,
        false
      );
      newManagers.push(manager);

      this._managers = newManagers;
    }

    if (upgrades.length === 0) {
      let newUpgrades = [];

      let upgrade = new Upgrade(
        21,
        "Little Umbrellas",
        "Lemonade",
        250000,
        false
      );
      newUpgrades.push(upgrade);

      upgrade = new Upgrade(
        22,
        "Funny Pages",
        "Newspaper Delivery",
        500000,
        false
      );
      newUpgrades.push(upgrade);

      upgrade = new Upgrade(
        23,
        "Drive Through Wash",
        "Car Wash",
        1000000,
        false
      );
      newUpgrades.push(upgrade);

      upgrade = new Upgrade(24, "Robot Cars", "Pizza Delivery", 5000000, false);
      newUpgrades.push(upgrade);

      upgrade = new Upgrade(
        25,
        "Pre-packaged Pastries",
        "Donut Shop",
        10000000,
        false
      );
      newUpgrades.push(upgrade);

      upgrade = new Upgrade(
        26,
        "Shrimp Satellite",
        "Shrimp Boat",
        25000000,
        false
      );
      newUpgrades.push(upgrade);

      upgrade = new Upgrade(27, "Team Jet", "Hockey Team", 500000000, false);
      newUpgrades.push(upgrade);

      upgrade = new Upgrade(
        28,
        "3D Cameras",
        "Movie Studio",
        10000000000,
        false
      );
      newUpgrades.push(upgrade);

      upgrade = new Upgrade(
        29,
        "Gold Plated Vaults",
        "Bank",
        50000000000,
        false
      );
      newUpgrades.push(upgrade);

      upgrade = new Upgrade(
        30,
        "Spill Proof Tankers",
        "Oil Company",
        250000000000,
        false
      );
      newUpgrades.push(upgrade);

      upgrade = new Upgrade(
        31,
        "Monopoly",
        "All Business",
        1000000000000,
        false
      );
      newUpgrades.push(upgrade);

      this._upgrades = newUpgrades;
    }

    this._revenueMultiplier = 1;
    this._timerMultiplier = 1;
    this._minShopAmount = Infinity;
    this._managedShops = managedShops;
    this._oldCash = oldCash;
  }

  get cash() {
    return this._cash;
  }

  set cash(cash) {
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

  get timerMultiplier() {
    return this._timerMultiplier;
  }

  set timerMultiplier(num) {
    this._timerMultiplier *= num;
  }

  get revenueMultiplier() {
    return this._revenueMultiplier;
  }

  set revenueMultiplier(num) {
    this._revenueMultiplier = num;
  }

  get minShopAmount() {
    return this._minShopAmount;
  }

  set minShopAmount(num) {
    this._minShopAmount = num;
  }

  get oldCash() {
    return this._oldCash;
  }

  set oldCash(amount) {
    this._oldCash = amount;
  }

  get managedShops() {
    return this._managedShops;
  }

  set managedShops(shopName) {
    console.log(shopName);
    if (shopName) {
      this._managedShops.push(shopName);
    }
  }

  /**
   *
   * @param {*} shopName name of the Shop to be purchased
   * @param {*} amount amount of the Shop to be purchased
   */
  async purchaseShop(shopName, amount) {
    const index = this.shops.findIndex((shop) => shop.name === shopName);
    // index not found
    if (index < 0) {
      return;
    }

    // check purchase cost
    const purchaseCost = this.shops[index].checkCost(amount);
    if (this.cash < purchaseCost) {
      return;
    }
    await this.shops[index].purchase(amount);

    console.log(`cash: ${this.cash}`);
    console.log(`shop cost: ${purchaseCost}`);
    console.log(`diff: ${this.cash - purchaseCost}`);
    this.cash = -1 * purchaseCost;
    // update and get the new minShopAmount
    this.minShopAmount = Math.min(...this.shops.map((shop) => shop.amount));
    // global shop # check up to 2000
    if (this.minShopAmount >= 25 && this.minShopAmount < 50) {
      this.timerMultiplier = 2;
      this.shops.map(
        (shop) =>
          (shop.baseTimerMultiplier =
            shop.baseTimerMultiplier * this.timerMultiplier)
      );
    } else if (this.minShopAmount >= 50 && this.minShopAmount < 100) {
      this.timerMultiplier = 4;
      this.shops.map(
        (shop) =>
          (shop.baseTimerMultiplier =
            shop.baseTimerMultiplier * this.timerMultiplier)
      );
    } else if (this.minShopAmount >= 100 && this.minShopAmount < 200) {
      this.timerMultiplier = 8;
      this.shops.map(
        (shop) =>
          (shop.baseTimerMultiplier =
            shop.baseTimerMultiplier * this.timerMultiplier)
      );
    } else if (this.minShopAmount >= 200 && this.minShopAmount < 300) {
      this.timerMultiplier = 16;
      this.shops.map(
        (shop) =>
          (shop.baseTimerMultiplier =
            shop.baseTimerMultiplier * this.timerMultiplier)
      );
    } else if (this.minShopAmount >= 300 && this.minShopAmount < 400) {
      this.timerMultiplier = 32;
      this.shops.map(
        (shop) =>
          (shop.baseTimerMultiplier =
            shop.baseTimerMultiplier * this.timerMultiplier)
      );
    } else if (this.minShopAmount >= 400) {
      this.timerMultiplier = 64;
      this.shops.map(
        (shop) =>
          (shop.baseTimerMultiplier =
            shop.baseTimerMultiplier * this.timerMultiplier)
      );
    }

    if (this.minShopAmount >= 500) {
      this.revenueMultiplier = Math.pow(
        Math.floor(this.minShopAmount - 500 / 100) + 1,
        2
      );
    }
    await this.save();
  }

  async hireManager(managerNum) {
    let index = this.managers.findIndex(
      (manager) => manager.managerNum === managerNum
    );

    // index not found
    if (index < 0) {
      return;
    }

    // Insufficient cash
    if (this.cash < this.managers[index].cost) {
      console.log("not enough cash!");
      return;
    }

    this.cash = -1 * this.managers[index].cost;
    this.managers[index].hired = true;
    await Promise.all([this.save(), this.managers[index].save()]);

    // its 1 : 1 index for managers + shops
    this.managedShops = this.shops[index].name;
    // immediately call click on the item
    Shop.expire(index, this.timerMultiplier);
  }

  async purchaseUpgrade(upgradeNum) {
    let index = this.upgrades.findIndex(
      (upgrade) => upgrade.upgradeNum === upgradeNum
    );

    // index not found
    if (index < 0) {
      return;
    }

    // Insufficient cash
    if (this.cash < this.upgrades[index].cost) {
      console.log("not enough cash!");
      return;
    }
    console.log("upgrade cost", this.upgrades[index].cost);
    this.cash = -1 * this.upgrades[index].cost;
    this.upgrades[index].purchased = true;
    await Promise.all([this.save(), this.upgrades[index].save()]);
  }
  save() {
    return addAccount(this);
  }
}

module.exports = Account;
