import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule }             from '@angular/http';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage }   from '../pages/home/home';

// Pages

// import { EuroPipe } from '../pipes/euro.pipe.ts';

// FE
import { BrowseCartPage }   from '../pages/shop/browse-cart';
import { BrowseMenuPage }   from '../pages/shop/browse-menu';
import { CheckoutPage }     from '../pages/shop/checkout';
import { EditCartItemPage } from '../pages/shop/edit-cart-item';

// BE
import { BrowseStoresPage }   from '../pages/store-admin/browse-stores';
import { EditOrderPage }      from '../pages/store-admin/edit-order';
import { ViewOrdersPage }     from '../pages/store-admin/view-orders';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    // pipes
    // EuroPipe,
    // custom pages
    BrowseCartPage, BrowseMenuPage, CheckoutPage, EditCartItemPage,
    BrowseStoresPage, ViewOrdersPage, EditOrderPage
  ],
  imports: [
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    // pipes
    // EuroPipe,
    // custom pages
    BrowseCartPage, BrowseMenuPage, CheckoutPage, EditCartItemPage,
    BrowseStoresPage, ViewOrdersPage, EditOrderPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
}