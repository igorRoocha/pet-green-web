import { Address } from './address';
import { Contact } from './contact';
import { Schedules } from './schedules';
export class Clinic {
    id: string;
    name: string;
    taxId: string;
    email: string;
    logo: string;
    site: string;
    facebook: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    address: Address;
    contacts: Contact[];
    schedules: Schedules[];

    public Clinic() {
        this.address = new Address();
    }
}
