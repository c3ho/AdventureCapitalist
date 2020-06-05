const { addUpgrade, getUpgrade, getUpgrades } = require("../utils/storage");

class Upgrade {
  constructor(upgradeNum, name, business, cost, purchased = false) {
    this._upgradeNum = upgradeNum;
    this._name = name;
    this._cost = cost;
    this._purchased = purchased;
    this._business = business;
  }

  get upgradeNum() {
    return this._upgradeNum;
  }
  get purchased() {
    return this._purchased;
  }

  get name() {
    return this._name;
  }

  get cost() {
    return this._cost;
  }

  get business() {
    return this._business;
  }

  set purchased(state) {
    this._purchased = state;
  }

  save() {
    return addUpgrade(this);
  }

  static async create(upgradeData) {
    const upgrade = new Upgrade(
      upgradeData.upgradeNum,
      upgradeData.name,
      upgradeData.business,
      upgradeData.cost,
      upgradeData.purchased
    );
    await upgrade.save();
    return upgradeData.upgradeNum;
  }

  static async byId(id) {
    const data = await getUpgrade(id);
    return new Upgrade(
      parseInt(data.upgradeNum),
      data.name,
      data.business,
      parseInt(data.cost),
      data.purchased === "true"
    );
  }

  static async all() {
    const ids = await getUpgrades();
    return Promise.all(ids.map(getUpgrade));
  }
}

module.exports = Upgrade;
