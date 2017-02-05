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

    public getCreatedAt() : Date {
        return this.created_at;
    }

    public setCreatedAt(createdAt: Date) : Order {
        this.created_at = createdAt;
        return this;
    }

    public getCreatedBy() : string {
        return this.created_by;
    }

    public setCreatedBy(createdBy: string) : Order {
        this.created_by = createdBy;
        return this;
    }

    public getItemList() : OrderItem[] {
        return this.items;
    }

    public setItemList(itemList: OrderItem[]) : Order {
        this.items = itemList;
        return this;
    }

    public getStore() : Store {
        return this.store;
    }

    public setStore(store: Store) : Order {
        this.store = store;
        return this;
    }

    public getStatus() : string {
        return this.status;
    }

    public setStatus(status: string) : Order {
        this.status = status;
        return this;
    }
}