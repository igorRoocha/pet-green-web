import { BreedService } from './../services/registers/breed.service';
import { SpecieService } from './../services/registers/species.service';
import { SpeciesRegisterComponent } from './registers/species-register/species-register.component';
import { NewSpeciesComponent } from './registers/modal/new-species/new-species.component';
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
import { BreedRegisterComponent } from './registers/breed-register/breed-register.component';
import { NewBreedComponent } from './registers/modal/new-breed/new-breed.component';

export const MODULE_COMPONENTS = [
    BreedRegisterComponent,
    ClinicRegisterComponent,
    SidebarComponent,
    DashboardComponent,
    NavbarComponent,
    AddressRegisterComponent,
    ContactRegisterComponent,
    NewContactComponent,
    SchedulesRegisterComponent,
    NewScheduleComponent,
    NewSpeciesComponent,
    DropzoneComponent,
    SpeciesRegisterComponent,
    NewBreedComponent
];

export const MODULE_SERVICES_COMPONENTS = [
    AddressService,
    BreedService,
    SpecieService,
];
