import { Injectable, Inject } from '@angular/core';
import { VIA_CEP } from './../../../assets/constants';
import { UtilService } from '../../util/util.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class AddressService {

    constructor(@Inject(HttpClient) private http: HttpClient,
                @Inject(UtilService) private utilService: UtilService) {
    }

    public consultCep(cep: string) {
        return this.http.get(`${VIA_CEP}/${cep}/json/`, {headers: null}).pipe();
    }
}
