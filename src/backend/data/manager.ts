export default class Manager {
    name: string;
    cost: number;
    hired: boolean;

    constructor(name: string, cost: number, hired: boolean = false){
        this.name = name;
        this.cost = cost;
        this.hired = hired;
    }

    setHired() {
        this.hired = true;
    }
}