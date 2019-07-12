import { UserService } from './../services/user.service';
import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { login_route } from './login/login.route';
import { CreateAccountComponent } from './create-account/create-account.component';
import { create_account_route } from './create-account/create-account.route';

export const MODULE_ROUTES_EXTERNAL: Route[] = [
    create_account_route,
    login_route,
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];

export const MODULE_COMPONENTS_EXTERNAL = [
    LoginComponent,
    CreateAccountComponent
];

export const MODULE_SERVICES_EXTERNAL = [
    UserService
];