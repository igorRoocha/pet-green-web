import { Clinic } from './../models/clinic';
import { Injectable, Inject } from '@angular/core';
import { API_URL } from 'src/assets/constants';
import { UtilService } from '../util/util.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ClinicService {
    private baseUrl = `${API_URL}clinic/`;
    private header;

    constructor(@Inject(HttpClient) private http: HttpClient,
                @Inject(UtilService) private utilService: UtilService) {
        this.header = new HttpHeaders({
            'Authorization': `bearer ${this.utilService.getToken()}`
        });
    }

    public register(clinic: Clinic) {
        return this.http.post(`${this.baseUrl}register`, clinic, this.header).pipe(map(res => res));
    }

    public getClinic() {
        return this.http.get(`${this.baseUrl}getClinic`, this.header).pipe(map(res => res));
    }
}
