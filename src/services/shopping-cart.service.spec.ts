import { ShoppingCartService } from './shopping-cart.service';

import { OrderItem } from '../models/order-item';

describe('Service: Shopping Cart Service', () => {

    localStorage.clear();

    let shoppingCartService = new ShoppingCartService();

    let testOrderItem1 = new OrderItem(null);
    testOrderItem1.setCreatedAt(123456789);

    let testOrderItem2 = new OrderItem(null);
    testOrderItem2.setCreatedAt(987654321);

    it("initializes an empty shopping cart on first visit", () => {
        expect(shoppingCartService.getOrderItemList()).toEqual([]);
    });

    it("persists a new order item if it has not been persisted before", () => {
        shoppingCartService.save(testOrderItem1);
        expect(shoppingCartService.getOrderItemList()).toEqual([testOrderItem1]);
    });

    it("updates a previously persisted order item correctly", () => {
        expect(shoppingCartService.getOrderItemList().length).toEqual(1);

        let updateOrderItem = new OrderItem(null);
        updateOrderItem.setSize("xl");
        updateOrderItem.setCreatedAt(123456789);

        shoppingCartService.save(updateOrderItem);
        let orderItemList = shoppingCartService.getOrderItemList();
        expect(orderItemList.length).toEqual(1);
        expect(orderItemList[0].getSize()).toEqual("xl");
    });

    it("stores multiple order items with ease", () => {
        shoppingCartService.save(testOrderItem2);
        expect(shoppingCartService.getOrderItemList().length).toEqual(2);
    });

    it("removes an order item successfully", () => {
        shoppingCartService.remove(testOrderItem2);
        expect(shoppingCartService.getOrderItemList().length).toEqual(1);
    });

    it("clears the shopping cart completely", () => {
        shoppingCartService.clear();
        expect(shoppingCartService.getOrderItemList()).toEqual([]);
    });
});