import { Caterer } from './../../models/caterer';
import { Injectable, Inject } from '@angular/core';
import { API_URL } from 'src/assets/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilService } from 'src/app/util/util.service';
import { map } from 'rxjs/operators';

@Injectable()
export class CatererService {
    private baseUrl = `${API_URL}caterer/`;
    private header;

    constructor(@Inject(HttpClient) private http: HttpClient,
                @Inject(UtilService) private utilService: UtilService) {
        this.header = new HttpHeaders({
            'Authorization': `bearer ${this.utilService.getToken()}`
        });
    }

    public register(caterer: Caterer) {
        console.log(caterer);
        return this.http.post(`${this.baseUrl}register`, caterer, this.header).pipe(map(res => res));
    }
}