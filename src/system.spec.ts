import { PIZZA_SIZES } from './data/pizza-sizes.ts';

describe("System:", () => {

    it("initializes the system with 3 static pizza sizes", () => {
        expect(PIZZA_SIZES.length).toEqual(3);
    });
});