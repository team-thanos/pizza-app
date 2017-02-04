import { Injectable } from '@angular/core';

import { OrderItem } from '../models/order-item';

import * as lodash from 'lodash';

/**
 * A service for calculating the cost of orders and order items.
 */
@Injectable()
export class CostCalculatorService {

    /**
     * Calculates the cost of all order items in the shopping cart.
     */
    public calculateTotalCost(orderItemList: OrderItem[]) : number {

        let totalCost = 0;
        orderItemList.forEach(orderItem => totalCost += this.calculateOrderItemCost(orderItem));

        return totalCost;
    }

    /**
     * Calculates the cost of a single order item.
     */
    public calculateOrderItemCost(orderItem: OrderItem) : number {

        let productPriceField = "price_" + orderItem.size;
        let pizzaPrice = lodash.max([orderItem.primary_product[productPriceField], orderItem.secondary_product[productPriceField]]);

        let toppingsPrice = 0;
        orderItem.toppings.forEach(topping => toppingsPrice += topping.price);

        return pizzaPrice + toppingsPrice;
    }
}