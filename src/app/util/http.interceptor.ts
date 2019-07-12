import { UtilService } from './util.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { LOCALSTORAGE_TOKEN_KEY } from '../../assets/constants';
import { map, finalize, catchError } from 'rxjs/operators';

declare var swal: any;

@Injectable()
export class InterceptedHttp implements HttpInterceptor {
    constructor(@Inject(UtilService) private utilService: UtilService) {
    }


    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        this.beforeRequest();

        return next.handle(req).pipe(map(res => res),
            finalize(() => {
                this.afterRequest();
            }));

    }

    private beforeRequest() {
        document.getElementById('loading').style.display = 'block';
        document.getElementById('content').style.filter = 'blur(3px)';
        const links = document.getElementsByTagName('a');
        for (let i = 0; i < links.length; i++) {
            links[i]['style']['pointerEvents'] = 'none';
            links[i]['style']['cursor'] = 'wait';
        }
        const buttons = document.getElementsByTagName('button');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i]['style']['pointerEvents'] = 'none';
            buttons[i]['disabled'] = true;
            buttons[i]['style']['cursor'] = 'wait';
        }
        const clickables = document.getElementsByClassName('click');
        for (let i = 0; i < clickables.length; i++) {
            clickables[i]['style']['pointerEvents'] = 'none';
            clickables[i]['disabled'] = true;
            clickables[i]['style']['cursor'] = 'wait';
        }

    }

    private afterRequest() {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('content').style.filter = 'none';
        const links = document.getElementsByTagName('a');
        for (let i = 0; i < links.length; i++) {
            links[i]['style']['pointerEvents'] = 'auto';
            links[i]['style']['cursor'] = 'auto';
        }
        const buttons = document.getElementsByTagName('button');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i]['style']['pointerEvents'] = 'auto';
            buttons[i]['disabled'] = false;
            buttons[i]['style']['cursor'] = 'auto';
        }
        const clickables = document.getElementsByClassName('click');
        for (let i = 0; i < clickables.length; i++) {
            clickables[i]['style']['pointerEvents'] = 'auto';
            clickables[i]['disabled'] = false;
            clickables[i]['style']['cursor'] = 'pointer';
        }

    }
}
