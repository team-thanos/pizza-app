import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';

import { Store }        from '../../models/store';
import { StoreService } from '../../services/store.service';

import { ViewOrdersPage } from './view-orders';

import * as lodash from 'lodash';

@Component({
  selector   : 'page-browse-stores',
  templateUrl: 'browse-stores.html',
  providers  : [StoreService]
})
export class BrowseStoresPage {

    private loadingIndicator: any;

    private storeList: Store[];

    constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, private storeService: StoreService) {
        this.loadingIndicator = this.loadingCtrl.create({
            content: 'Filialen werden geladen...'
        });
    }

    public getStoreList(): Store[] {
        return lodash.sortBy(this.storeList, 'name');
    }

    public storeTapped(store: Store): void {
        this.navCtrl.push(ViewOrdersPage, {store: store});
    }

    public reload() : void {
        this.loadingIndicator.present();
        this.storeService.getList().subscribe(
            storeList => {
                this.storeList = storeList;
                this.loadingIndicator.dismiss();
            },
            error => console.log(error)
        );
    }

    ionViewDidLoad() {
        this.reload();
    }
}