import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { login_route } from './login/login.route';

export const MODULE_ROUTES_EXTERNAL: Route[] = [
    login_route,
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];

export const MODULE_COMPONENTS_EXTERNAL = [
    LoginComponent
];

export const MODULE_SERVICES_EXTERNAL = [

];