import { City } from './city';
export class Address {
    id: string;
    cep: string;
    number: number;
    street: string;
    neighborhood: string;
    complement: string;
    city: City;
}
