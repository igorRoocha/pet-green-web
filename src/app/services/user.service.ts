import { Injectable, Inject } from '@angular/core';
import { API_URL } from 'src/assets/constants';
import { UtilService } from '../util/util.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
    private baseUrl = `${API_URL}User/`;
    private header;

    constructor(@Inject(HttpClient) private http: HttpClient,
                @Inject(UtilService) private utilService: UtilService) {
        this.header = new HttpHeaders({
            'Authorization': `bearer ${this.utilService.getToken()}`
        });
    }

    public login(user) {
        return this.http.post(`${this.baseUrl}login`, user, this.header).pipe(map(res => res));
    }

    public post(user) {
        return this.http.post(`${this.baseUrl}`, user).pipe();
    }

    public getById(id) {
        return this.http.get(`${this.baseUrl}${id}`).pipe();
    }
}
