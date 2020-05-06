export default class Shop {
    amount: number;
    cost: number;
    revenue: number;
    timeOut: number;
    name: string;
    coefficient: number;
    currCost: number;

    constructor(name: string, amount: number = 0, revenue: number, cost: number = 0, coefficient: number = 0, timeOut: number = 0){
        this.name = name;
        this.amount = amount;
        this.revenue = revenue;
        this.coefficient = coefficient;
        this.timeOut = timeOut;
        // base cost
        this.cost = cost;
        this.currCost = cost;
    }

    getAmount() {
        return this.amount;
    }

    // Returns current cost of upgrading shop
    getCost() {
        return Math.round(100 * this.currCost)/100;
    }

    getTimeout() {
        return this.timeOut;
    }

    purchaseOne() {
        this.amount += this.amount;
        this.currCost *= this.coefficient;
    }

    /**
     * @param amount The number of times the user is upgrading shop
     * @returns totalCost Sum cost of upgrade
     */

    // WE ALSO NEED TO CHECK + SET UPGRADE BONUSES (50, 100, 150, 200)
    purchase(amount: number): number {
        let totalCost: number = 0;
        for (let i = 0; i < amount; i++) {
            this.amount++;
            this.currCost = Math.round(Math.pow(this.coefficient, this.amount) * this.cost * 100) / 100
            totalCost += this.currCost;
        }
        console.log(totalCost);
        return totalCost;
    }

    setTimeout(timeOut: number) {
        this.timeOut = timeOut
    }
}