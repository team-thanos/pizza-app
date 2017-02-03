import { OrderItem } from './order-item';
import { Store }     from './store';

export class Order {

    /**
     * The identifier of an order
     */
    public _id: string;

    /**
     * A Date object indicating when the order was placed
     */
    public created_at: Date;

    /**
     * The customer who placed this order
     */
    public created_by: string;

    /**
     * The list of order items associated with this order
     */
    public items: OrderItem[] = [];

    /**
     * The store responsible for processing this order
     */
    public store: Store;

    /**
     * The status of this order: "neu", "backend" or "fertig"
     */
    public status: string;
}