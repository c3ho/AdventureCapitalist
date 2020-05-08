export default class Manager {
    private _name: string;
    private _cost: number;
    private _hired: boolean;
    private _business: string;

    constructor(name: string, business: string, cost: number, hired: boolean = false){
        this._name = name;
        this._cost = cost;
        this._hired = hired;
        this._business = business;
    }

    get hired() : boolean {
        return this._hired;
    }

    get name() : string {
        return this._name;
    }

    get cost() : number {
        return this._cost;
    }
    
    get business() : string {
        return this._business;
    }

    set hired(state: boolean) {
        this._hired = state;
    }
}