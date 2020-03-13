import { City } from './city';
export class Address {
    public id: string;
    public cep: string;
    public number: string;
    public street: string;
    public neighborhood: string;
    public complement: string;
    public city: City;

    public constructor(init?: Partial<Address>) {
        Object.assign(this, init);
    }
}
