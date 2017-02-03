export class PizzaSize {

    /**
     * The identifier to be used in HTML value attributes and persistent records
     */
    public identifier: string;

    /**
     * The wording for the pizza size, for example "S", "L" or "XL"
     */
    private label: String;

    /**
     * Flag indicating whether combo selection applies to this pizza size
     */
    private comboEnabled: boolean;

    /**
     * The maximum number of toppings allowed for a pizza of this size
     */
    private maximumNumberOfToppings: number;

    constructor(identifier: string, label: String, comboEnabled: boolean, maximumNumberOfToppings: number) {
        this.identifier = identifier;
        this.label = label;
        this.comboEnabled = comboEnabled;
        this.maximumNumberOfToppings = maximumNumberOfToppings;
    }

    public getIdentifier(): string {
        return this.identifier;
    }
}