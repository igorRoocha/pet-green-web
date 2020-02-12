import { Injectable, Inject } from '@angular/core';
import { API_URL } from 'src/assets/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilService } from 'src/app/util/util.service';
import { map } from 'rxjs/operators';
import { Specie } from 'src/app/models/registers/specie';

@Injectable()
export class SpecieService {
    private baseUrl = `${API_URL}specie/`;
    private header;

    constructor(@Inject(HttpClient) private http: HttpClient,
                @Inject(UtilService) private utilService: UtilService) {
        this.header = new HttpHeaders({
            'Authorization': `bearer ${this.utilService.getToken()}`
        });
    }

    public register(specie: Specie) {
        console.log(specie);
        return this.http.post(`${this.baseUrl}register`, specie, this.header).pipe(map(res => res));
    }

    public get() {
        return this.http.get(`${this.baseUrl}get`, this.header).pipe(map(res => res));
    }

    public edit(specie: Specie) {
        return this.http.put(`${this.baseUrl}edit`, specie, this.header).pipe(map(res => res));
    }

    public delete(id: string) {
        return this.http.delete(`${this.baseUrl}delete?id=${id}`, this.header).pipe(map(res => res));
    }
}