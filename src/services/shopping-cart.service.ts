import { Injectable } from '@angular/core';

import { OrderItem } from '../models/order-item';

import * as lodash from 'lodash';

/**
 * A service for managing the shopping cart.
 */
@Injectable()
export class ShoppingCartService {

    /**
     * The complete list of order items currently in the user's basket.
     */
    private orderItemList: OrderItem[] = [];

    /**
     * Initializes the shopping cart.
     * Loads the current cart content from the browser's local storage if possible.
     */
    public constructor() {
        let cartJson = localStorage.getItem('cart');
        if (null != cartJson) {
            this.orderItemList = JSON.parse(cartJson);
        }
    }

    /**
     * Returns a list of all order items currently in the customer's basket.
     */
    public getOrderItemList() : OrderItem[] {
        return this.orderItemList;
    }

    /**
     * Removes an order item from the basket.  
     */
    public remove(orderItem: OrderItem) : void {
        lodash.remove(this.orderItemList, ['created_at', orderItem.created_at]);
        this.persist();
    }

    /**
     * Saves an order item.
     */
    public save(orderItem: OrderItem) : void {
        // attempt to locate the order item in the singleton shopping cart instance
        let storedOrderItem = lodash.find(this.orderItemList, ['created_at', orderItem.created_at]);

        if (null == storedOrderItem) {
            // add order item to current basket if it has not yet been added
            this.orderItemList.push(orderItem);
        }
        else {
            // update order item if one has already been persisted
            lodash.assign(storedOrderItem, orderItem);
        }

        this.persist();
    }

    /**
     * Removes all order items from the shopping cart.
     */
    public clear() : void {
        this.orderItemList = [];
        this.persist();
    }

    /**
     * Saves a serialized version of the cart instance to the user's local storage.
     */
    private persist() : void {
        localStorage.setItem('cart', JSON.stringify(this.orderItemList));
    }
}