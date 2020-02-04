import { DropzoneComponent } from './dropzone/dropzone.component';
import { ContactRegisterComponent } from './registers/contact-register/contact-register.component';
import { AddressService } from './../services/address.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddressRegisterComponent } from './registers/address-register/address-register.component';
import { NewContactComponent } from './registers/modal/new-contact/new-contact.component';
import { SchedulesRegisterComponent } from './registers/schedules-register/schedules-register.component';
import { NewScheduleComponent } from './registers/modal/new-schedule/new-schedule.component';
import { ClinicRegisterComponent } from './registers/clinic-register/clinic-register.component';

export const MODULE_COMPONENTS = [
    ClinicRegisterComponent,
    SidebarComponent,
    DashboardComponent,
    NavbarComponent,
    AddressRegisterComponent,
    ContactRegisterComponent,
    NewContactComponent,
    SchedulesRegisterComponent,
    NewScheduleComponent,
    DropzoneComponent
];

export const MODULE_SERVICES_COMPONENTS = [
    AddressService
];
