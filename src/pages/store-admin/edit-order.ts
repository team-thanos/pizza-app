import { Component } from '@angular/core';

import { NavController, NavParams, ToastController } from 'ionic-angular';

import * as lodash from 'lodash';

import { Order }        from '../../models/order';
import { OrderService } from '../../services/order.service';

@Component({
    selector   : 'edit-order',
    templateUrl: 'edit-order.html',
    providers  : [OrderService]
})
export class EditOrderPage {

    /**
     * The order associated with this page
     */
    public order: Order;

    /**
     * A copy of the order record which we're going to attach to the form
     */
    public orderCopy: Order;

    /**
     * Bootstrap the edit order form
     */
    constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, private orderService: OrderService) {
    }

    /**
     * Save changes made to this order on the server
     */
    public onChange(orderCopy: Order) : void {
        this.orderService.update(orderCopy).subscribe(
            order => {
                let toast = this.toastCtrl.create({
                    message : 'Bestellung erfolgreich aktualisiert!',
                    duration: 1000,
                    position: 'top'
                });
                toast.present();

                // copy status change to the original order so if we switch back to the orders list the change becomes immediately visible without refreshing the page!
                this.order.status = orderCopy.status;
            },
            error => console.log(error)
        );
    }

    public ionViewDidLoad() {

        // link the target order with this view
        this.order = this.navParams.get('order');

        // create a deep copy of the order
        this.orderCopy = lodash.cloneDeep(this.order);
    }
}