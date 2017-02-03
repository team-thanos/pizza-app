import { Injectable } from '@angular/core';

import { OrderItem } from '../models/order-item';

import * as lodash from 'lodash';

@Injectable()
export class ShoppingCartService {

    private orderItemList: OrderItem[] = [];

    public constructor() {
        let cartJson = localStorage.getItem('cart');
        if (null != cartJson) {
            this.orderItemList = JSON.parse(cartJson);
        }
        // this.clear();
    }

    public getOrderItemList() : OrderItem[] {
        return this.orderItemList;
    }

    public remove(orderItem: OrderItem) : void {
        lodash.remove(this.orderItemList, ['created_at', orderItem.created_at]);
        this.persist();
    }

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
     * Removes all order items from the shopping cart
     */
    public clear() : void {
        this.orderItemList = [];
        this.persist();
    }

    /**
     * Saves a serialized version of the cart instance to the local storage
     */
    private persist() : void {
        localStorage.setItem('cart', JSON.stringify(this.orderItemList));
    }
}