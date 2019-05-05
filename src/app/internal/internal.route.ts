import { HomeComponent } from './home/home/home.component';
import { SidebarService } from './../components/sidebar/sidebar.service';
import { Route } from '@angular/router';
import { home_route } from './home/home/home.route';
export const MODULE_ROUTES_INTERNAL: Route[] = [
    home_route,
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

export const MODULE_COMPONENTS_INTERNAL = [
    HomeComponent
];

export const MODULE_SERVICES_INTERNAL = [
    SidebarService
];
