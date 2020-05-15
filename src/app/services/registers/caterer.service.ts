import { Caterer } from './../../models/caterer';
import { Injectable, Inject } from '@angular/core';
import { API_URL } from 'src/assets/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UtilService } from 'src/app/util/util.service';

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
        return this.http.post(`${this.baseUrl}register`, caterer, this.header).pipe(map(res => res));
    }

    public getByUserID(userID) {
        return this.http.get(`${this.baseUrl}getByUserID?userID=${userID}`, this.header).pipe(map(res => res));
    }

    public edit(caterer: Caterer) {
        return this.http.put(`${this.baseUrl}`, caterer, this.header).pipe(map(res => res));
    }

    public delete(id: string) {
        return this.http.delete(`${this.baseUrl}${id}`, this.header).pipe(map(res => res));
    }
}