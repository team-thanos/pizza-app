import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage }         from '../pages/home/home';
import { BrowseMenuPage }   from '../pages/shop/browse-menu';

import { BrowseStoresPage } from '../pages/store-admin/browse-stores';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = HomePage;
    pages: Array<{title: string, component: any}>;

    constructor(public platform: Platform, public menu: MenuController) {
        this.initializeApp();

        this.pages = [{
            title    : 'Startseite',
            component: HomePage
        }, {
            title    : 'Filialen',
            component: BrowseStoresPage
        }, {
            title    : 'Shoppen',
            component: BrowseMenuPage
        }];
    }

    initializeApp() {
        this.platform.ready().then(() => {
            StatusBar.styleDefault();
            Splashscreen.hide();
        });
    }

    openPage(page) {
        this.menu.close();
        this.nav.setRoot(page.component);
    }
}
