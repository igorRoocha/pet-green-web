import { breedRegisterRoute } from './registers/breed/breed.route';
import { SpeciesComponent } from './registers/species/species.component';
import { ClinicService } from './../services/clinic.service';
import { HomeComponent } from './home/home/home.component';
import { SidebarService } from './../components/sidebar/sidebar.service';
import { Route } from '@angular/router';
import { home_route } from './home/home/home.route';
import { ClinicComponent } from './registers/clinic/clinic.component';
import { clinicRegisterRoute } from './registers/clinic/clinic.route';
import { speciesRegisterRoute } from './registers/species/species.route';
import { BreedComponent } from './registers/breed/breed.component';

export const MODULE_ROUTES_INTERNAL: Route[] = [
    breedRegisterRoute,
    clinicRegisterRoute,
    speciesRegisterRoute,
    home_route,
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

export const MODULE_COMPONENTS_INTERNAL = [
    ClinicComponent,
    HomeComponent,
    SpeciesComponent,
    BreedComponent,
];

export const MODULE_SERVICES_INTERNAL = [
    SidebarService,
    ClinicService
];
