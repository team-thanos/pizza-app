import { CostCalculatorService } from './cost-calculator.service';

import { OrderItem } from '../models/order-item';
import { Pizza }     from '../models/pizza';
import { Topping }   from '../models/topping';

describe('Service: Cost Calculator Service', () => {

    let costCalculatorService: CostCalculatorService;

    const testProduct1 = new Pizza(null, "Test-Pizza 1", "Lecker Test-Pizza 1", 5.00,  8.00,  9);
    const testProduct2 = new Pizza(null, "Test-Pizza 2", "Lecker Test-Pizza 2", 6.00,  8.00, 14);
    const testProduct3 = new Pizza(null, "Test-Pizza 3", "Lecker Test-Pizza 3", 7.00, 10.50, 11);

    const testTopping1 = new Topping(null, "Test-Topping 1", "Yummy Test-Topping 1", 0.50);
    const testTopping2 = new Topping(null, "Test-Topping 2", "Yummy Test-Topping 2", 1.00);
    const testTopping3 = new Topping(null, "Test-Topping 3", "Yummy Test-Topping 3", 2.50);
    const testTopping4 = new Topping(null, "Test-Topping 4", "Yummy Test-Topping 4", 1.20);
    const testTopping5 = new Topping(null, "Test-Topping 5", "Yummy Test-Topping 5", 0.75);

    let orderItem1: OrderItem;
    let orderItem2: OrderItem;
    let orderItem3: OrderItem;
    let orderItem4: OrderItem;

    beforeEach(() => costCalculatorService = new CostCalculatorService());

    beforeEach(() => {
        orderItem1 = new OrderItem(testProduct1);

        orderItem2 = new OrderItem(testProduct2);
        orderItem2.setSize("l");
        orderItem2.setSecondaryProduct(testProduct3);

        orderItem3 = new OrderItem(testProduct2);
        orderItem3.setSize("xl");
        orderItem3.setSecondaryProduct(testProduct3);

        orderItem4 = new OrderItem(testProduct1);
        orderItem4.setSize("l");
        orderItem4.setSecondaryProduct(testProduct2);
    });

    it("calculates the price for a pizza of size S  w/o combo selection/toppings correctly", () => {
        expect(costCalculatorService.calculateOrderItemCost(orderItem1)).toEqual(5);
    });

    it("calculates the price for a pizza of size L  w/o combo selection/toppings correctly", () => {
        orderItem1.setSize("l");
        expect(costCalculatorService.calculateOrderItemCost(orderItem1)).toEqual(8);
    });

    it("calculates the price for a pizza of size XL w/o combo selection/toppings correctly", () => {
        orderItem1.setSize("xl");
        expect(costCalculatorService.calculateOrderItemCost(orderItem1)).toEqual(9);
    });

    it("calculates the correct price in a combo selection (i.e. calculates the price of the more expensive pizza) 1/3", () => {
        expect(costCalculatorService.calculateOrderItemCost(orderItem2)).toEqual(10.50);
    });

    it("calculates the correct price in a combo selection (i.e. calculates the price of the more expensive pizza) 2/3", () => {
        expect(costCalculatorService.calculateOrderItemCost(orderItem3)).toEqual(14);
    });

    it("calculates the correct price in a combo selection (i.e. calculates the price of the more expensive pizza) 3/3", () => {
        expect(costCalculatorService.calculateOrderItemCost(orderItem4)).toEqual(8);
    });

    it("calculates the price for a pizza of size S  w/o combo selection and 1 topping  correctly", () => {
        orderItem1.setToppingList([testTopping1]);
        expect(costCalculatorService.calculateOrderItemCost(orderItem1)).toEqual(5.50);
    });

    it("calculates the price for a pizza of size L  w/o combo selection and 3 toppings correctly", () => {
        orderItem1.setSize("l");
        orderItem1.setToppingList([testTopping2, testTopping4, testTopping5]);
        expect(costCalculatorService.calculateOrderItemCost(orderItem1)).toEqual(10.95);
    });

    it("calculates the price for a pizza of size XL w/o combo selection and 5 toppings correctly", () => {
        orderItem1.setSize("xl");
        orderItem1.setToppingList([testTopping1, testTopping2, testTopping3, testTopping4, testTopping5]);
        expect(costCalculatorService.calculateOrderItemCost(orderItem1)).toEqual(14.95);
    });

    it("calculates the price for a pizza of size L  with combo selection and 2 toppings correctly", () => {
        orderItem2.setToppingList([testTopping1, testTopping2]);
        expect(costCalculatorService.calculateOrderItemCost(orderItem2)).toEqual(12.00);
    });

    it("calculates the price for a pizza of size XL with combo selection and 4 toppings correctly", () => {
        orderItem3.setToppingList([testTopping2, testTopping3, testTopping4, testTopping5]);
        expect(costCalculatorService.calculateOrderItemCost(orderItem3)).toEqual(19.45);
    });

    it("calculates the price for a incomplete order composed of zero order items correctly", () => {
        expect(costCalculatorService.calculateTotalCost([])).toEqual(0);
    });

    it("calculates the price for a complete order composed of 2 complex order items correctly", () => {
        orderItem3.setToppingList([testTopping2, testTopping4, testTopping5]);
        expect(costCalculatorService.calculateTotalCost([orderItem1, orderItem3])).toEqual(21.95);
    });

    it("calculates the price for a complete order composed of 3 complex order items correctly", () => {
        orderItem3.setToppingList([testTopping2, testTopping3, testTopping4]);
        orderItem4.setToppingList([testTopping1]);
        expect(costCalculatorService.calculateTotalCost([orderItem1, orderItem3, orderItem4])).toEqual(32.2);
    });

    it("calculates the price for a complete order composed of 4 complex order items correctly", () => {
        orderItem3.setToppingList([testTopping5]);
        orderItem4.setToppingList([testTopping1, testTopping5]);
        expect(costCalculatorService.calculateTotalCost([orderItem1, orderItem2, orderItem3, orderItem4])).toEqual(39.5);
    });
});