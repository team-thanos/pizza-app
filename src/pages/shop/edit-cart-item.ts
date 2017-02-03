import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { OrderItem } from '../../models/order-item';
import { Pizza }     from '../../models/pizza';
import { PizzaSize } from '../../models/pizza-size';
import { Topping }   from '../../models/topping';

import { CostCalculatorService } from '../../services/cost-calculator.service';
import { PizzaService }          from '../../services/pizza.service';
import { ToppingService }        from '../../services/topping.service';
import { ShoppingCartService }   from '../../services/shopping-cart.service';

import { PIZZA_SIZES, STANDARD_PIZZA_SIZE } from '../../data/pizza-sizes';

import * as lodash from 'lodash';

@Component({
  selector   : 'page-edit-cart-item',
  templateUrl: 'edit-cart-item.html',
  providers  : [CostCalculatorService, PizzaService, ShoppingCartService, ToppingService]
})
export class EditCartItemPage {

    /**
     * The order item to edit
     */
    private orderItem: OrderItem;

    /**
     * Static list of purchasable pizza sizes
     */
    private pizzaSizeList: PizzaSize[] = PIZZA_SIZES;

    /**
     * The set of available products
     */
    private productList: Pizza[];

    /**
     * The set of available toppings
     */
    private toppingList: Topping[];

    /**
     * Flag indicating whether the customer has opted for a pizza combo
     */
    public formComboActive: boolean;

    /**
     * The ID of the secondary product currently selected
     */
    public formSecondaryProductId: string;

    /**
     * The list of topping IDs currently selected
     */
    public formToppingIdList: string[] = [];

    /**
     * The product size currently selected
     */
    public formSelectedProductSize: PizzaSize = STANDARD_PIZZA_SIZE;

    /**
     * The identifier of the product size currently selected
     */
    public formSelectedProductSizeId: string = STANDARD_PIZZA_SIZE.getIdentifier();

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private viewCtrl: ViewController,
        private costCalculatorService: CostCalculatorService,
        private pizzaService: PizzaService,
        private toppingService: ToppingService,
        private shoppingCartService: ShoppingCartService
    ) {
        // associate the order item with this page
        this.orderItem = this.navParams.get('orderItem');
        // initialize this form based on the provided order item
        this.initializeForm(this.orderItem);
    }

    /**
     * Returns the list of products sorted by name
     */
    public getProductList(): Pizza[] {
        return lodash.sortBy(this.productList, 'name');
    }

    /**
     * Returns the list of toppings sorted by name
     */
    public getToppingList(): Topping[] {
        return lodash.sortBy(this.toppingList, 'name');
    }

    /**
     * Returns the surcharge to be displayed in the secondary product selection combobox
     */
    public getComboSurcharge(secondaryProduct: Pizza) : number {
        // the field name holding the price value for the selected pizza size
        let priceField = 'price_' + this.formSelectedProductSizeId;
        // the price for the primary and secondary product depending on the selected size
        let primaryProductPrice = this.orderItem.primary_product[priceField];
        let secondaryProductPrice = secondaryProduct[priceField];
        // compute the price difference between the secondary and primary product
        let surcharge = secondaryProductPrice - primaryProductPrice;
        // return positive surcharge or 0 if surcharge is negative (in which case there is no surcharge)
        return surcharge > 0 ? surcharge : 0;
    }

    /**
     * Initializes this form
     */
    private initializeForm(orderItem: OrderItem) : void {
        // the combo option will initially only be enabled if the user has selected 2 different products
        this.formComboActive = (this.orderItem.primary_product._id != this.orderItem.secondary_product._id);

        // store the identifier of the chosen product size
        this.formSelectedProductSizeId = this.orderItem.size;

        // resolve the size object by its identifier
        this.formSelectedProductSize = this.resolveProductSize(this.formSelectedProductSizeId);

        // store the ID of the initially selected secondary product
        this.formSecondaryProductId = this.orderItem.secondary_product._id;

        // store the ID of each topping initially associated with this order item
        this.orderItem.toppings.forEach((topping) => this.formToppingIdList.push(topping._id));
    }

    /**
     * Handler invoked when the user changed the product size
     */
    public handleProductSizeChange(button): void {
        // update the PizzaSize instance associated with the clicked button
        this.formSelectedProductSize = this.resolveProductSize(button.value);
    }

    /**
     * Returns the size definition for a given size identifier
     */
    private resolveProductSize(sizeIdentifier: string) : PizzaSize {
        return this.pizzaSizeList.filter(pizzaSize => sizeIdentifier == pizzaSize.getIdentifier())[0];
    }

    /**
     * Handler invoked when the user clicks the "Fertig" button
     */
    public saveTapped() {

        // update the original record
        lodash.assign(this.orderItem, this.getInterimOrderItem());

        // save order item if not already saved
        this.shoppingCartService.save(this.orderItem);
        // go back
        this.viewCtrl.dismiss();
    }

    /**
     * Creates an interim order item from current form input
     */
    public getInterimOrderItem() : OrderItem {
        // pre-compute update data
        let size = this.formSelectedProductSizeId;
        let secondary_product = (size != 's' && this.formComboActive)
            ? lodash.find(this.productList, ['_id', this.formSecondaryProductId])
            : this.orderItem.primary_product;
        let toppings = [];
        this.formToppingIdList.forEach(toppingId => toppings.push(lodash.find(this.toppingList, ['_id', toppingId])));

        let interimOrderItem = lodash.cloneDeep(this.orderItem);

        interimOrderItem.size = size;
        interimOrderItem.secondary_product = secondary_product;
        interimOrderItem.toppings = toppings;

        return interimOrderItem;
    }

    ionViewDidLoad() {
        // load the list of products from the server
        this.pizzaService.getList().subscribe(
            productList => this.productList = productList,
            error => console.log(error)
        );
        // load the list of toppings from the server
        this.toppingService.getList().subscribe(
            toppingList => this.toppingList = toppingList,
            error => console.log(error)
        );
    }
}