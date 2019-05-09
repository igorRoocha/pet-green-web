import { CreateAccountComponent } from './create-account.component';
import { Route } from '@angular/router';

export const create_account_route: Route = {
    path: 'registro',
    component: CreateAccountComponent,
    data: {
        name: 'Registrar Conta',
        menu: false,
        parent: null
      }
}
