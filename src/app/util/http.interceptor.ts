
import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { LOCALSTORAGE_TOKEN_KEY } from '../../assets/constants';
import { map, finalize, catchError } from 'rxjs/operators';

declare var swal: any;

@Injectable()
export class InterceptedHttp extends Http {
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private router: Router) {
        super(backend, defaultOptions);
    }

    request(url: Request, options?: RequestOptionsArgs): Observable<Response> {
        this.beforeRequest();

        return super.request(url, this.getRequestOptionArgs(options))
            .pipe(map(res => res),
                finalize(() => {
                    this.afterRequest();
                }));
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.get(url, this.getRequestOptionArgs(options));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.post(url, body, this.getRequestOptionArgs(options));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.put(url, body, this.getRequestOptionArgs(options));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.delete(url, this.getRequestOptionArgs(options));
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
        document.getElementById('content').style.filter = 'blur(0px)';
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

    private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {

        if (!options) {
            options = new RequestOptions();
        }

        if (!options.headers) {
            options.headers = new Headers();
            options.headers.append('Content-Type', 'application/json');
        }

        const obj = JSON.parse(localStorage.getItem(LOCALSTORAGE_TOKEN_KEY));
        if (obj && obj.token) {
            const tokenPrepared = `${obj.token.token_type} ${obj.token.access_token}`;
            options.headers.append(LOCALSTORAGE_TOKEN_KEY, tokenPrepared);
        }

        if (options.headers.get('intercept')) {
            options = null;
        }

        return options;
    }
}
