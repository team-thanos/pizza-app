export class PizzaSize {

    /**
     * The identifier to be used in HTML value attributes and persistent records
     */
    public identifier: string;

    /**
     * The wording for the pizza size, for example "S", "L" or "XL"
     */
    private label: string;

    /**
     * Flag indicating whether combo selection applies to this pizza size
     */
    private comboEnabled: boolean;

    /**
     * The maximum number of toppings allowed for a pizza of this size
     */
    public maximumNumberOfToppings: number;

    constructor(identifier: string, label: string, comboEnabled: boolean, maximumNumberOfToppings: number) {
        this.identifier = identifier;
        this.label = label;
        this.comboEnabled = comboEnabled;
        this.maximumNumberOfToppings = maximumNumberOfToppings;
    }

    public getIdentifier() : string {
        return this.identifier;
    }

    public getLabel() : string {
        return this.label;
    }

    public getComboEnabled() : boolean {
        return this.comboEnabled;
    }

    public getMaximumNumberOfToppings() : number {
        return this.maximumNumberOfToppings;
    }
}