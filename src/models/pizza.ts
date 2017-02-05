export class Pizza {

    constructor(public _id: string, public name: string, public description: string, public price_s: number, public price_l: number, public price_xl: number) {
    }

    public getName() : string {
        return this.name;
    }

    public setName(name: string) : Pizza {
        this.name = name;
        return this;
    }

    public getDescription() : string {
        return this.description;
    }

    public setDescription(description: string) : Pizza {
        this.description = description;
        return this;
    }

    public getPriceS() : number {
        return this.price_s;
    }

    public setPriceS(price: number) : Pizza {
        this.price_s = price;
        return this;
    }

    public getPriceL() : number {
        return this.price_l;
    }

    public setPriceL(price: number) : Pizza {
        this.price_l = price;
        return this;
    }

    public getPriceXL() : number {
        return this.price_xl;
    }

    public setPriceXL(price: number) : Pizza {
        this.price_xl = price;
        return this;
    }
}