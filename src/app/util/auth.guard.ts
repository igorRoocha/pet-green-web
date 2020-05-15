import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Inject } from "@angular/core";
import { UtilService } from './util.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(@Inject(Router) private router: Router,
        @Inject(UtilService) private utilService: UtilService) {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        const errorMessage = 'Você não está autorizado à acessar esta funcionalidade, por favor, efetue login e tente novamente';

        if (this.utilService.isLogged()) {
            return true;
        }

        this.utilService.errorMsg(errorMessage, null, () => {
            this.router.navigate(['']);
        });

        return false;
    }
}