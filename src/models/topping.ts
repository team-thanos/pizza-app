export class Topping {

    constructor(public _id: string, public name: string, public description: string, public price: number) {
    }

    public getName() : string {
        return this.name;
    }

    public setName(name: string) : Topping {
        this.name = name;
        return this;
    }

    public getDescription() : string {
        return this.description;
    }

    public setDescription(description: string) : Topping {
        this.description = description;
        return this;
    }

    public getPrice() : number {
        return this.price;
    }

    public setPrice(price: number) : Topping {
        this.price = price;
        return this;
    }
}