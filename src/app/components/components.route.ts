import { CatererRegisterComponent } from './registers/register/caterer-register/caterer-register.component';
import { CatererFormComponent } from './registers/forms/caterer-form/caterer-form.component';
import { BreedService } from './../services/registers/breed.service';
import { SpecieService } from './../services/registers/species.service';
import { NewSpeciesComponent } from './registers/modal/new-species/new-species.component';
import { DropzoneComponent } from './dropzone/dropzone.component';
import { ContactRegisterComponent } from './registers/register/contact-register/contact-register.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddressRegisterComponent } from './registers/register/address-register/address-register.component';
import { NewContactComponent } from './registers/modal/new-contact/new-contact.component';
import { SchedulesRegisterComponent } from './registers/register/schedules-register/schedules-register.component';
import { NewScheduleComponent } from './registers/modal/new-schedule/new-schedule.component';
import { ClinicRegisterComponent } from './registers/register/clinic-register/clinic-register.component';
import { NewBreedComponent } from './registers/modal/new-breed/new-breed.component';
import { NewCoatComponent } from './registers/modal/new-coat/new-coat.component';
import { BreedListComponent } from './registers/list/breed-list/breed-list.component';
import { CatererListComponent } from './registers/list/caterer-list/caterer-list.component';
import { CoatListComponent } from './registers/list/coat-list/coat-list.component';
import { SpeciesListComponent } from './registers/list/species-list/species-list.component';
import { ProfileListComponent } from './registers/list/profile-list/profile-list.component';
import { NewProfileComponent } from './registers/modal/new-profile/new-profile.component';
import { AddressService } from '../services/registers/address.service';

export const MODULE_COMPONENTS = [
    AddressRegisterComponent,
    BreedListComponent,
    CatererFormComponent,
    CatererListComponent,
    CatererRegisterComponent,
    ClinicRegisterComponent,
    CoatListComponent,
    ContactRegisterComponent,
    DashboardComponent,
    DropzoneComponent,
    NavbarComponent,
    NewBreedComponent,
    NewCoatComponent,
    NewContactComponent,
    NewScheduleComponent,
    NewSpeciesComponent,
    NewProfileComponent,
    SchedulesRegisterComponent,
    SidebarComponent,
    SpeciesListComponent,
    ProfileListComponent,
];

export const MODULE_SERVICES_COMPONENTS = [
    AddressService,
    BreedService,
    SpecieService,
];
