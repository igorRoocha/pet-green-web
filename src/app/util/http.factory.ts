import {XHRBackend, Http, RequestOptions} from '@angular/http';
import {Router} from '@angular/router';
import { InterceptedHttp } from './http.interceptor';

export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, router: Router): Http {
  return new InterceptedHttp(xhrBackend, requestOptions, router);
}
