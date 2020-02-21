import { Profile } from './profile';
import { Clinic } from './clinic';

export class User {
    id: string;
    email: string;
    name: string;
    password: string;
    active: boolean;
    profile: Profile;
    clinic: Clinic;
    createdAt: Date;
    updatedAt: Date;
    DeletedAt: Date;
}
