import { Injectable } from '@angular/core';

import { OrderItem } from '../models/order-item';

import * as lodash from 'lodash';

@Injectable()
export class CostCalculatorService {

    public calculateTotalCost(orderItemList: OrderItem[]) : number {

        let totalCost = 0;
        orderItemList.forEach(orderItem => totalCost += this.calculateOrderItemCost(orderItem));

        return totalCost;
    }

    public calculateOrderItemCost(orderItem: OrderItem) : number {

        let productPriceField = "price_" + orderItem.size;
        let pizzaPrice = lodash.max([orderItem.primary_product[productPriceField], orderItem.secondary_product[productPriceField]]);

        let toppingsPrice = 0;
        orderItem.toppings.forEach(topping => toppingsPrice += topping.price);

        return pizzaPrice + toppingsPrice;
    }
}