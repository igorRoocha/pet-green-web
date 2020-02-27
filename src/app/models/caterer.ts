import { Address } from './address';
import { Contact } from './contact';
import { Schedules } from './schedules';

export class Caterer {
    id: string;
    name: string;
    taxId: string;
    socialReason: string;
    stateRegistration: string;
    email: string;
    logo: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    address: Address;
    contacts: Contact[];
    schedules: Schedules[];
    userID: string;
}