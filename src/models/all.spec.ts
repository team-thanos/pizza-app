import { Order }     from '../models/order';
import { OrderItem } from '../models/order-item';
import { Pizza }     from '../models/pizza';
import { PizzaSize } from '../models/pizza-size';
import { Store }     from '../models/store';
import { Topping }   from '../models/topping';

import { STANDARD_PIZZA_SIZE } from '../data/pizza-sizes';

describe("All domain models:", () => {

    let order      : Order;
    let orderItem  : OrderItem;
    let product    : Pizza;
    let productSize: PizzaSize;
    let store      : Store;
    let topping    : Topping;

    it("can instantiate pizza", () => {
        product = new Pizza("123", "My pizza name", "My pizza description", 7, 8, 9);
        expect(product).toBeTruthy();
    });

    it("can read and write all pizza properties", () => {
        expect(product.getName()).toEqual("My pizza name");
        expect(product.getDescription()).toEqual("My pizza description");
        expect(product.getPriceS()).toEqual(7);
        expect(product.getPriceL()).toEqual(8);
        expect(product.getPriceXL()).toEqual(9);

        product.setName("My updated pizza name");
        product.setDescription("My updated pizza description");
        product.setPriceS(10);
        product.setPriceL(11);
        product.setPriceXL(12);

        expect(product.getName()).toEqual("My updated pizza name");
        expect(product.getDescription()).toEqual("My updated pizza description");
        expect(product.getPriceS()).toEqual(10);
        expect(product.getPriceL()).toEqual(11);
        expect(product.getPriceXL()).toEqual(12);
    });

    it("can instantiate pizza sizes", () => {
        productSize = new PizzaSize("xl", "XL", true , 5);
        expect(productSize).toBeTruthy();
    });

    it("can read all pizza size properties", () => {
        expect(productSize.getIdentifier()).toEqual("xl");
        expect(productSize.getLabel()).toEqual("XL");
        expect(productSize.getComboEnabled()).toEqual(true);
        expect(productSize.getMaximumNumberOfToppings()).toEqual(5);
    });

    it("can instantiate stores", () => {
        store = new Store("123", "My store name", "My store street", "18147", "Rostock", "0381/1234567");
        expect(store).toBeTruthy();
    });

    it("can read and write all store properties", () => {
        expect(store.getName()).toEqual("My store name");
        expect(store.getStreet()).toEqual("My store street");
        expect(store.getPostalCode()).toEqual("18147");
        expect(store.getCity()).toEqual("Rostock");
        expect(store.getPhoneNumber()).toEqual("0381/1234567");

        store.setName("My updated store name");
        store.setStreet("My updated store street");
        store.setPostalCode("11011");
        store.setCity("Berlin");
        store.setPhoneNumber("030/7654321");

        expect(store.getName()).toEqual("My updated store name");
        expect(store.getStreet()).toEqual("My updated store street");
        expect(store.getPostalCode()).toEqual("11011");
        expect(store.getCity()).toEqual("Berlin");
        expect(store.getPhoneNumber()).toEqual("030/7654321");
    });

    it("can instantiate toppings", () => {
        topping = new Topping("123", "My topping name", "My topping description", 1.00);
        expect(topping).toBeTruthy();
    });

    it("can read and write all topping properties", () => {
        expect(topping.getName()).toEqual("My topping name");
        expect(topping.getDescription()).toEqual("My topping description");
        expect(topping.getPrice()).toEqual(1.00);

        topping.setName("My updated topping name");
        topping.setDescription("My updated topping description");
        topping.setPrice(2.00);

        expect(topping.getName()).toEqual("My updated topping name");
        expect(topping.getDescription()).toEqual("My updated topping description");
        expect(topping.getPrice()).toEqual(2.00);
    });

    it("can instantiate order items", () => {
        orderItem = new OrderItem(product);
        expect(orderItem).toBeTruthy();
    });

    it("order items will have a creation timestamp attached to them upon instantiation", () => {
        expect(orderItem.getCreatedAt()).toBeGreaterThan(0);
    });

    it("order items will be initialized with an empty list of toppings", () => {
        expect(orderItem.getToppingList()).toEqual([]);
    });

    it("order items will be initialized with the system wide default pizza size", () => {
        expect(orderItem.getSize()).toEqual(STANDARD_PIZZA_SIZE.getIdentifier());
    });

    it("can read and write all order item properties", () => {
        let anotherProduct = new Pizza("456", "Another pizza name", "Another pizza description", 4, 5, 6);

        orderItem.setCreatedAt(1234567);
        orderItem.setPrimaryProduct(anotherProduct);
        orderItem.setSecondaryProduct(anotherProduct);
        orderItem.setSize("xl");
        orderItem.setToppingList([topping]);

        expect(orderItem.getCreatedAt()).toEqual(1234567);
        expect(orderItem.getPrimaryProduct()).toEqual(anotherProduct);
        expect(orderItem.getSecondaryProduct()).toEqual(anotherProduct);
        expect(orderItem.getSize()).toEqual("xl");
        expect(orderItem.getToppingList()).toEqual([topping]);
    });

    it("can instantiate orders", () => {
        order = new Order();
        expect(order).toBeTruthy();
    });

    it("orders will be initialized with an empty list of order items", () => {
        expect(order.getItemList()).toEqual([]);
    });

    it("can read and write all order properties", () => {
        let date = new Date(100000000);

        order.setCreatedAt(date);
        order.setCreatedBy("0171/11112222");
        order.setItemList([orderItem]);
        order.setStore(store);
        order.setStatus("backend");

        expect(order.getCreatedAt()).toEqual(date);
        expect(order.getCreatedBy()).toEqual("0171/11112222");
        expect(order.getItemList()).toEqual([orderItem]);
        expect(order.getStore()).toEqual(store);
        expect(order.getStatus()).toEqual("backend");
    });
});