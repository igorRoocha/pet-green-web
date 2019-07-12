import { HomeComponent } from './home/home/home.component';
import { SidebarService } from './../components/sidebar/sidebar.service';
import { Route } from '@angular/router';
import { home_route } from './home/home/home.route';
import { ClinicRegisterComponent } from './registers/clinic/clinic-register/clinic-register.component';
import { clinic_register_route } from './registers/clinic/clinic-register/clinic-register.route';
export const MODULE_ROUTES_INTERNAL: Route[] = [
    clinic_register_route,
    home_route,
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

export const MODULE_COMPONENTS_INTERNAL = [
    ClinicRegisterComponent,
    HomeComponent
];

export const MODULE_SERVICES_INTERNAL = [
    SidebarService
];
