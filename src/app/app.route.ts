import { MODULE_ROUTES_INTERNAL } from './internal/internal.route';
import { InternalComponent } from './internal/internal.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './util/auth.guard';
import { ExternalComponent } from './external/external.component';
import { MODULE_ROUTES_EXTERNAL } from './external/external.route';

const APP_ROUTES: Routes = [
    {
        path: 'app', component: InternalComponent, canActivate: [AuthGuard],
        children: MODULE_ROUTES_INTERNAL
    },
    {
        path: '', component: ExternalComponent,
        children: MODULE_ROUTES_EXTERNAL
    },
    // otherwise redirect to ContentComponent
    { path: '**', redirectTo: 'app', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
