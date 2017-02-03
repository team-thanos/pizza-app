export class Store {
    _id        : string;
    name       : string;
    street     : string;
    postalCode : string;
    city       : string;
    phoneNumber: string;

    public getName() : string {
        return this.name;
    }
}