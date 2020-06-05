const { addManager, getManager, getManagers } = require("../utils/storage");

class Manager {
  constructor(managerNum, name, business, cost, hired = false) {
    this._managerNum = managerNum;
    this._name = name;
    this._cost = cost;
    this._hired = hired;
    this._business = business;
  }

  get managerNum() {
    return this._managerNum;
  }
  get hired() {
    return this._hired;
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

  set hired(state) {
    this._hired = state;
  }

  save() {
    return addManager(this);
  }

  static async create(managerData) {
    const manager = new Manager(
      managerData.managerNum,
      managerData.name,
      managerData.business,
      managerData.cost,
      managerData.hired
    );
    await manager.save();
    return managerData.managerNum;
  }

  static async byId(id) {
    const data = await getManager(id);
    return new Manager(
      parseInt(data.managerNum),
      data.name,
      data.business,
      parseInt(data.cost),
      data.hired === "true"
    );
  }

  static async all() {
    const ids = await getManagers();
    return Promise.all(ids.map(getManager));
  }
}

module.exports = Manager;
