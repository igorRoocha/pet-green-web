import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Inject } from "@angular/core";
import { Router } from "@angular/router";
import { UtilService } from './util.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(@Inject(Router) private router: Router,
        @Inject(UtilService) private utilService: UtilService) {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        const errorMessage = 'Você não está autorizado à acessar esta funcionalidade, por favor, efetue login e tente novamente';

        return true; //########### ALTERAR APÓS FAZER O LOGIN
        if (this.utilService.isLogged()) {
            return true;
        }

        this.utilService.errorMsg(errorMessage, () => {
            this.router.navigate(['']);
        });

        return true;
    }
}