export class Store {

    constructor(
        public _id         : string,
        public name        : string,
        public street      : string,
        public postal_code : string,
        public city        : string,
        public phone_number: string
    ) {
    }

    public getName() : string {
        return this.name;
    }

    public setName(name: string) : Store {
        this.name = name;
        return this;
    }

    public getStreet() : string {
        return this.street;
    }

    public setStreet(street: string) : Store {
        this.street = street;
        return this;
    }

    public getPostalCode() : string {
        return this.postal_code;
    }

    public setPostalCode(postalCode: string) : Store {
        this.postal_code = postalCode;
        return this;
    }

    public getCity() : string {
        return this.city;
    }

    public setCity(city: string) : Store {
        this.city = city;
        return this;
    }

    public getPhoneNumber() : string {
        return this.phone_number;
    }

    public setPhoneNumber(phoneNumber: string) : Store {
        this.phone_number = phoneNumber;
        return this;
    }
}