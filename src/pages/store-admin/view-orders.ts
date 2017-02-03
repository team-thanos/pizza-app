import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';

import { Order }        from '../../models/order';
import { Store }        from '../../models/store';

import { OrderService } from '../../services/order.service';

import { EditOrderPage } from './edit-order';

import * as lodash from 'lodash';

@Component({
  selector   : 'page-view-orders',
  templateUrl: 'view-orders.html',
  providers  : [OrderService]
})
export class ViewOrdersPage {

    /**
     * The store whose orders we want to display
     */
    private store: Store;

    /**
     * The complete list of orders
     */
    private orderList: Order[];

    private loadingIndicator: any;

    constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, private orderService: OrderService) {
        this.loadingIndicator = this.loadingCtrl.create({
            content: 'Bestellungen werden geladen...'
        });
    }

    /**
     * Returns a filtered list of orders belonging to this store (sorted from new to old)
     */
    public getOrderList(): Order[] {

        var orders = this.orderList;

        orders = lodash.filter(orders, (order) => order.store._id == this.store._id);
        orders = lodash.sortBy(orders, 'created_at');
        orders = lodash.reverse(orders);

        return orders;
    }

    /**
     * Displays the edit order dialog when the user clicks on an order item
     */
    public orderTapped(order: Order) : void {
        this.navCtrl.push(EditOrderPage, {order: order});
    }

    /**
     * Retrieves the list of orders from the order service and assigns them to this view
     */
    public reload() : void {
        this.loadingIndicator.present();
        this.orderService.getList().subscribe(
            orderList => {
                this.orderList = orderList;
                this.loadingIndicator.dismiss();
            },
            error => console.log("error ^^", error)
        );
    }

    /**
     * Life cycle callback method invoked by the framework when the view has been loaded
     */
    public ionViewDidLoad() {

        // link the target store with this view
        this.store = this.navParams.get('store');

        // reload view data
        this.reload();
    }
}