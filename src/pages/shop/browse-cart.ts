import { Component } from '@angular/core';
import { AlertController, NavController, ToastController } from 'ionic-angular';

import { OrderItem } from '../../models/order-item';

import { CostCalculatorService } from '../../services/cost-calculator.service';
import { ShoppingCartService }   from '../../services/shopping-cart.service';

import { CheckoutPage }     from './checkout';
import { EditCartItemPage } from './edit-cart-item';

@Component({
  selector   : 'page-browse-cart',
  templateUrl: 'browse-cart.html',
  providers  : [CostCalculatorService, ShoppingCartService]
})
export class BrowseCartPage {

    /**
     * The list of order items currently in the basket
     */
    private orderItemList: OrderItem[] = [];

    /**
     * Constructs this page
     */
    constructor(
        private alertCtrl: AlertController,
        private navCtrl: NavController,
        private toastCtrl: ToastController,
        private costCalculatorService: CostCalculatorService,
        private shoppingCartService: ShoppingCartService
    ) {
    }

    /**
     * Load shopping cart items from the shoppping cart service
     */
    reload(): void {
        this.orderItemList = this.shoppingCartService.getOrderItemList();
    }

    /**
     * Handler invoked when the user clicks the checkout icon
     */
    public checkoutTapped() : void {
        this.navCtrl.push(CheckoutPage);
    }

    /**
     * Handler invoked when the user clicks the tool icon
     */
    public editCartItemTapped(orderItem) : void {
        this.navCtrl.push(EditCartItemPage, {orderItem: orderItem});
    }

    /**
     * Handler invoked when the user clicks the trash icon
     */
    public removeCartItemTapped(orderItem) : void {
        let prompt = this.alertCtrl.create({
            title: "Position entfernen?",
            buttons: [{
                text: 'Abbrechen'
            }, {
                text: 'Bestätigen',
                handler: data => {
                    this.shoppingCartService.remove(orderItem);
                    let toast = this.toastCtrl.create({
                        message : 'Position aus Warenkorb entfernt',
                        duration: 1000,
                        position: 'top'
                    });
                    toast.present();
                }
            }]
        });
        prompt.present();
    }

    /**
     * Trigger data retrieval upon initializing this page
     */
    ionViewDidLoad(): void {
        this.reload();
    }
}