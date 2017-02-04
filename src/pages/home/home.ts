import { Component } from '@angular/core';

import { AlertController, LoadingController, NavController, ToastController } from 'ionic-angular';

import { ShoppingCartService } from '../../services/shopping-cart.service';
import { SystemService } from '../../services/system.service';

import { BrowseMenuPage }   from '../shop/browse-menu';
import { BrowseStoresPage } from '../store-admin/browse-stores';

@Component({
  selector   : 'page-home',
  templateUrl: 'home.html',
  providers  : [ShoppingCartService, SystemService]
})
export class HomePage {

    constructor(
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
        private navCtrl: NavController,
        private toastCtrl: ToastController,
        private shoppingCartService: ShoppingCartService,
        private systemService: SystemService
    ) {
    }

    public browseMenuTapped() : void {
        this.navCtrl.push(BrowseMenuPage);
    }

    public browseStoresTapped() : void {
        this.navCtrl.push(BrowseStoresPage);
    }

    public resetSystemTapped() : void {
        let prompt = this.alertCtrl.create({
            title: 'System zurücksetzen',
            message: 'Bitte gib das Wort "<strong>Thanos</strong>" in das Feld ein, um das System zurückzusetzen und mit neuen Demo-Daten zu initialisieren.',
            inputs: [{
                name: 'title',
                placeholder: 'Thanos'
            }],
            buttons: [{
                text: 'Abbrechen'
            }, {
                text: 'Bestätigen',
                handler: data => {
                    if ('Thanos' != data.title) {
                        let toast = this.toastCtrl.create({
                            message : 'Falscher Bestätigungscode. Aktion abgebrochen!',
                            duration: 1000,
                            position: 'top'
                        });
                        toast.present();
                    }
                    else {
                        let loadingIndicator = this.loadingCtrl.create({
                            content: 'Setze System zurück...'
                        });
                        loadingIndicator.present();
                        this.systemService.resetDb().subscribe(
                            () => {
                                // clear basket because all linked entities have become invalid
                                this.shoppingCartService.clear();
                                loadingIndicator.dismiss();
                                let toast = this.toastCtrl.create({
                                    message : 'Das System wurde erfolgreich zurückgesetzt.',
                                    duration: 1000,
                                    position: 'top'
                                });
                                toast.present();
                            },
                            error => console.log(error)
                        );
                    }
                }
            }]
        });
        prompt.present();
    }
}