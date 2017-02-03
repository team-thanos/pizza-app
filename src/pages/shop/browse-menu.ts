import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';

import { OrderItem } from '../../models/order-item';
import { Pizza }     from '../../models/pizza';

import { PizzaService } from '../../services/pizza.service';

import { BrowseCartPage }   from './browse-cart';
import { EditCartItemPage } from './edit-cart-item';

import * as lodash from 'lodash';

@Component({
  selector   : 'page-browse-menu',
  templateUrl: 'browse-menu.html',
  providers  : [PizzaService]
})
export class BrowseMenuPage {

    private loadingIndicator: any;

    /**
     * The list of pizza to display to the customer available for purchase
     */
    private productList: Pizza[];

    /**
     * Inject the pizza service into this component
     */
    constructor(public loadingCtrl: LoadingController, private navCtrl: NavController, private pizzaService: PizzaService) {
        this.loadingIndicator = this.loadingCtrl.create({
            content: 'Speisekarte wird geladen...'
        });
    }

    public getProductList(): Pizza[] {
        return lodash.sortBy(this.productList, 'name');
    }

    /**
     * Click handler
     */
    addToCartTapped(pizza: Pizza) : void {
        this.navCtrl.push(EditCartItemPage, {orderItem: new OrderItem(pizza)});
    }

    public browseCartTapped() : void {
        this.navCtrl.push(BrowseCartPage);
    }
    
    /**
     * Load the set of pizza for purchase from the server
     */
    reload(): void {
        this.loadingIndicator.present();
        this.pizzaService.getList().subscribe(
            productList => {
                this.productList = productList;
                this.loadingIndicator.dismiss();
            },
            error => console.log(error)
        );
    }

    /**
     * Trigger data retrieval upon initializing this page
     */
    ionViewDidLoad(): void {
        this.reload();
    }
}