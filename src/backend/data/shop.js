const { addShop, getShop, getShops, expire } = require("../utils/storage");

class Shop {
  constructor(
    shopNumber,
    name,
    amount = 0,
    revenue,
    cost = 0,
    coefficient = 0,
    timeOut = 0,
    revMultiplier = 1,
    baseTimerMultiplier = 1,
    available = true
  ) {
    this._shopNumber = shopNumber;
    this._name = name;
    this._amount = amount;
    this._revenue = revenue;
    this._coefficient = coefficient;
    this._timeOut = timeOut;
    // base cost
    this._cost = cost;
    this._currCost = cost;
    this._revMultiplier = revMultiplier;
    this._baseTimerMultiplier = baseTimerMultiplier;
    this._available = available;
    this._currTime = timeOut;
  }

  get shopNumber() {
    return this._shopNumber;
  }

  get name() {
    return this._name;
  }

  get amount() {
    return this._amount;
  }

  set amount(num) {
    this._amount += num;
  }

  // Returns current cost of upgrading shop
  get cost() {
    return Math.round(100 * this._currCost) / 100;
  }

  get timeout() {
    return this._timeOut / this.baseTimerMultiplier;
  }

  // Returns total revenue of shop
  get revenue() {
    return this._revenue * this._amount * this._revMultiplier;
  }

  get revMultiplier() {
    return this._revMultiplier;
  }

  set revMultiplier(num) {
    this._revMultiplier = num;
  }

  get baseTimerMultiplier() {
    return this._baseTimerMultiplier;
  }

  set baseTimerMultiplier(num) {
    this._baseTimerMultiplier = num;
  }

  get currTime() {
    return this._currTime;
  }

  set currTime(time) {
    this._currTime = time;
  }

  get available() {
    return this._available;
  }

  set available(ready) {
    this._available = ready;
  }

  get coefficient() {
    return this._coefficient;
  }

  get currCost() {
    return this._currCost;
  }

  set currCost(newCost) {
    this._currCost = newCost;
  }

  save() {
    return addShop(this);
  }

  // toDo can remove this
  static async create(shopData) {
    const shop = new Shop(
      shopData.shopNumber,
      shopData.name,
      shopData.amount,
      shopData.revenue,
      shopData.cost,
      shopData.coefficient,
      shopData.timeout,
      shopData.revMultiplier,
      shopData.baseTimerMultiplier,
      // base cost
      shopData.available
    );
    await shop.save();
    return shopData.shopNumber;
  }

  /* static async update(shopData) {
    const 
  } */

  // Returns a shop object of provided key from database
  static async byId(id) {
    const data = await getShop(id);
    return new Shop(
      parseInt(data.shopNumber),
      data.name,
      parseInt(data.amount),
      parseInt(data.revenue),
      parseInt(data.cost),
      parseFloat(data.coefficient),
      parseInt(data.timeout),
      parseFloat(data.revMultiplier),
      parseFloat(data.baseTimerMultiplier),
      data.available === "true"
    );
  }

  // Returns array of all shops from database
  static async all() {
    const ids = await getShops();
    return Promise.all(ids.map(getShop));
  }

  purchaseOne() {
    this._amount += 1;
    this._currCost *= this._coefficient;
  }

  /**
   * @param amount The number of times the user is upgrading shop
   * @returns Promise: totalCost Sum cost of upgrade
   */

  // We're checking up to 2000 copies of a shop
  async purchase(num) {
    let totalCost = 0;
    for (let i = 0; i < num; i++) {
      totalCost += this.currCost;
      this.amount = 1;
      this.currCost = Math.round(this.currCost * this.coefficient * 100) / 100;
    }

    // profit speed check
    if (this.amount > 24 && this.amount < 50) {
      this.baseTimerMultiplier = 2;
    } else if (this.amount > 49 && this.amount < 100) {
      this.baseTimerMultiplier = 4;
    } else if (this.amount > 99 && this.amount < 200) {
      this.baseTimerMultiplier = 8;
    } else if (this.amount > 199 && this.amount < 300) {
      this.baseTimerMultiplier = 16;
    } else if (this.amount > 299 && this.amount < 400) {
      this.baseTimerMultiplier = 32;
    } else if (this.amount > 399) {
      this.baseTimerMultiplier = 64;
    }

    // revenue multiplier check up to 2000
    if (this.amount >= 500 && this.amount < 2000) {
      this.revMultiplier = Math.pow(Math.floor(this.amount - 500 / 100) + 1, 2);
    } else if (this.amount >= 2000) {
      this.revMultiplier = Math.pow(1400 / 100 + 1, 2) * 5;
    }
    await this.save();
    return totalCost;
  }

  static async expire(id, timeOut) {
    const expNamespace = "exp:";
    const key = `${expNamespace}${id}`;
    await expire(key, timeOut);
  }
}

module.exports = Shop;
