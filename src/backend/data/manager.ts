export default class Manager {
    private _name: string;
    private _cost: number;
    private _hired: boolean;

    constructor(name: string, cost: number, hired: boolean = false){
        this._name = name;
        this._cost = cost;
        this._hired = hired;
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
    
    set hired(state: boolean) {
        this._hired = state;
    }
}