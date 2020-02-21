import { Injectable, Inject } from '@angular/core';
import { API_URL } from 'src/assets/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilService } from 'src/app/util/util.service';
import { map } from 'rxjs/operators';
import { Breed } from 'src/app/models/registers/breed';

@Injectable()
export class BreedService {
    private baseUrl = `${API_URL}breed/`;
    private header;

    constructor(@Inject(HttpClient) private http: HttpClient,
                @Inject(UtilService) private utilService: UtilService) {
        this.header = new HttpHeaders({
            'Authorization': `bearer ${this.utilService.getToken()}`
        });
    }

    public register(breed: Breed) {
        return this.http.post(`${this.baseUrl}register`, breed, this.header).pipe(map(res => res));
    }

    public get() {
        return this.http.get(`${this.baseUrl}`, this.header).pipe(map(res => res));
    }

    public edit(breed: Breed) {
        return this.http.put(`${this.baseUrl}`, breed, this.header).pipe(map(res => res));
    }

    public delete(id: string) {
        return this.http.delete(`${this.baseUrl}${id}`, this.header).pipe(map(res => res));
    }
}