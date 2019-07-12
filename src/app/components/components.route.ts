import { ContactRegisterComponent } from './registers/contact-register/contact-register.component';
import { AddressService } from './../services/address.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddressRegisterComponent } from './registers/address-register/address-register.component';
import { NewContactComponent } from './registers/modal/new-contact/new-contact.component';

export const MODULE_COMPONENTS = [
    SidebarComponent,
    DashboardComponent,
    NavbarComponent,
    AddressRegisterComponent,
    ContactRegisterComponent,
    NewContactComponent
];

export const MODULE_SERVICES_COMPONENTS = [
    AddressService
];
