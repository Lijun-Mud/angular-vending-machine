export interface ICoin {
    value: number;
    getImageUrl():string;
}

abstract class Coin implements ICoin {
    constructor(protected _value: number) {
    }
    protected baseUrl="/img/";
    get value(): number {
        return this._value;
    }
    set value(value: number) {
        throw new Error("Not implemented");
    }
    abstract getImageUrl(): string;
}

export class Quarter extends Coin {
    constructor() {
        super(0.25);
    }
    getImageUrl() {
        return this.baseUrl + "quarter.png";
    }
}

export class Dime extends Coin {
    constructor() {
        super(0.1);
    }
    getImageUrl(): string { return this.baseUrl + "dime.png"; }
}

export class Half extends Coin {
    constructor() {
        super(0.5);
    }
    getImageUrl(): string { return this.baseUrl + "half.png"; } 
}

export class Dollar extends Coin {
    constructor() {
        super(1);
    }
    getImageUrl(): string { return this.baseUrl + "dollar.jpg";  }
}