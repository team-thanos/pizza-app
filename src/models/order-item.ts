import { Pizza } from './pizza';
import { Topping }   from './topping';

import { STANDARD_PIZZA_SIZE } from '../data/pizza-sizes';

export class OrderItem {

    /**
     * The identifier of an order item
     */
    public _id: string;

    /**
     * Timestamp indicating when this item was added to the basket
     */
    public created_at: number = Date.now();

    /**
     * The pizza chosen in a combo selection (defaults to the primary pizza associated with this order item)
     */
    public secondary_product: Pizza;

    /**
     * The pizza size ("s", "l" or "xl")
     */
    public size: string = STANDARD_PIZZA_SIZE.identifier;

    /**
     * The set of toppings associated with this order item
     */
    public toppings: Topping[] = [];

    constructor(public primary_product: Pizza) {
        this.secondary_product = primary_product;
    }

    public setSize(size: string): OrderItem {
        this.size = size;
        return this;
    }
}