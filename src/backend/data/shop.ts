export default class Shop {
    private _amount: number;
    private _cost: number;
    private _revenue: number;
    private _timeOut: number;
    private _name: string;
    private _coefficient: number;
    private _currCost: number;

    constructor(name: string, amount: number = 0, revenue: number, cost: number = 0, coefficient: number = 0, timeOut: number = 0){
        this._name = name;
        this._amount = amount;
        this._revenue = revenue;
        this._coefficient = coefficient;
        this._timeOut = timeOut;
        // base cost
        this._cost = cost;
        this._currCost = cost;
    }

    get name(): string {
        return this._name;
    }

    get amount(): number {
        return this._amount;
    }

    // Returns current cost of upgrading shop
    get cost(): number {
        return Math.round(100 * this._currCost)/100;
    }

    get timeout() {
        return this._timeOut;
    }

    get revenue() {
        return this._revenue * this.amount
    }

    purchaseOne() {
        this._amount += 1;
        this._currCost *= this._coefficient;
    }

    /**
     * @param amount The number of times the user is upgrading shop
     * @returns totalCost Sum cost of upgrade
     */

    // WE ALSO NEED TO CHECK + SET UPGRADE BONUSES (50, 100, 150, 200)
    purchase(amount: number): number {
        let totalCost: number = 0;
        for (let i = 0; i < amount; i++) {
            this._amount++;
            this._currCost = Math.round(Math.pow(this._coefficient, this.amount) * this.cost * 100) / 100
            totalCost += this._currCost;
        }
        console.log(totalCost);
        return totalCost;
    }
}