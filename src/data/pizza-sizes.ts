import { PizzaSize } from '../models/pizza-size';

var size_s  = new PizzaSize("s" , "S" , false, 2);
var size_l  = new PizzaSize("l" , "L" , true , 3);
var size_xl = new PizzaSize("xl", "XL", true , 5);

export const PIZZA_SIZES: PizzaSize[] = [size_s, size_l, size_xl];

export const STANDARD_PIZZA_SIZE = size_s;