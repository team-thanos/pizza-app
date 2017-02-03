import { PizzaComponent }           from './components/pizza/pizza.component';
import { ShoppingCartComponent }    from './components/shopping-cart/shopping-cart.component';

export const ROUTES = [{
    path: 'list',
    component: PizzaComponent
}, {
    path: 'warenkorb',
    component: ShoppingCartComponent
}];