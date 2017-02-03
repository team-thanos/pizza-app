import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';

import { Order }     from '../../models/order';
import { OrderItem } from '../../models/order-item';
import { Store }     from '../../models/store';

import { OrderService }        from '../../services/order.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { StoreService }        from '../../services/store.service';

import * as lodash from 'lodash';

@Component({
  selector   : 'page-checkout',
  templateUrl: 'checkout.html',
  providers  : [OrderService, ShoppingCartService, StoreService]
})
export class CheckoutPage {

    private orderItemList: OrderItem[] = [];

    private storeList: Store[] = [];

    /**
     * The customer's phone number.
     */
    private formPhoneNumber = '';

    /**
     * The store currently selected.
     */
    private formStore : Store = null;

    /**
     * The ID of the store currently selected.
     */
    private formStoreId : string;

    /**
     * Flag indicating whether the order has been successfully placed
     */
    private formOrderPlaced : boolean = false;

    /**
     * Constructs this page
     */
    constructor(
        private loadingCtrl: LoadingController,
        private navCtrl: NavController,
        private shoppingCartService: ShoppingCartService,
        private orderService: OrderService,
        private storeService: StoreService
    ) {
    }

    public getStoreList() : Store[] {
        return lodash.sortBy(this.storeList, 'name');
    }

    /**
     * Handler invoked whenever the user changes the current store selection.
     */
    public handleStoreChange() : void {
        this.formStore = lodash.find(this.storeList, ['_id', this.formStoreId]);
    }

    /**
     * Returns true iff the entered phone number is valid. (i.e. the phone number has at least 7 digits in it)
     * Used to disable the form submit button on invalid field input.
     */
    public formPhoneNumberIsValid() : boolean {
        return (this.formPhoneNumber.replace(/[^0-9]/, "").length > 6);
    }

    /**
     * Handler invoked when the user clicks the submit order button.
     */
    public submitTapped() : void {
        // create a new order record
        let order = new Order();
        // copy order items from the shopping cart to the new order
        this.orderItemList.forEach(orderItem => order.items.push(orderItem));
        // make the selected store responsible for processing this order
        order.store = this.formStore;
        // assign entered phone number to order
        order.created_by = this.formPhoneNumber;

        // display the loading message to the customer
        let loadingIndicator = this.loadingCtrl.create({
            content: 'Deine Bestellung wird gespeichert...'
        });
        loadingIndicator.present();
        this.orderService.create(order).subscribe(
            order => {
                this.formOrderPlaced = true;
                loadingIndicator.dismiss();
            },
            error => console.log(error)
        );
    }

    /**
     * Load shopping cart items from local storage and stores from a service
     */
    ionViewDidLoad(): void {
        this.orderItemList = this.shoppingCartService.getOrderItemList();
        this.storeService.getList().subscribe(
            storeList => this.storeList = storeList,
            error => console.log(error)
        );
    }
}