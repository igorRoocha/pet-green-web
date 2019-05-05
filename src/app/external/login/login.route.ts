import { LoginComponent } from './login.component';
import { Route } from '@angular/router';

export const login_route: Route = {
    path: 'login',
    component: LoginComponent,
    data: {
      name: 'Login',
      icon: 'input',
      menu: false,
      parent: null
    }
  };