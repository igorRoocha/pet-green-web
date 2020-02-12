import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { LOCALSTORAGE_TOKEN_KEY } from '../../assets/constants';
import { RouteStack } from '../models/route-setack';
import * as $ from "jquery";
import swal from 'sweetalert2/src/sweetalert2.js';

@Injectable()
export class UtilService {

  constructor(@Inject(Http) private http: Http) {

  }

  private routeStack = [] as RouteStack[];

  public errorMsg(msg: string = 'Por favor, entre em contato com nossa equipe para resolvermos o problema o mais breve possível.',
                  title = 'Ocorreu um erro durante o processo :(',
                  callback: Function = () => {
    }): void {
    swal.fire({
      title,
      text: msg,
      type: 'error',
    }).then(callback);
  }

  public successMsg(msg: string, callback: Function = () => {
  }): void {
    this.validateMsg(msg);
    swal.fire({
      title: 'Sucesso!',
      text: msg,
      type: 'success',
    }).then(callback);
  }

  public informationMsg(msg: string): void {
    this.validateMsg(msg);
    swal.fire({ text: msg });
  }

  public confirmMsg(msg: string, title: string, callback: Function): void {
    this.validateCallback(callback);
    swal.fire({
      title: title,
      text: msg,
      type: 'question',
      confirmButtonColor: '#3085d6',
      showCancelButton: true,
      cancelButtonText: 'Não',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim'
    }).then(callback);
  }

  public alertMsg(msg: string, callback: Function): void {
    this.validateMsg(msg);
    this.validateCallback(callback);
    swal.fire({
      title: 'Alerta!',
      text: msg,
      type: 'warning'
    }).then(callback);
  }

  private validateMsg(mensagem: string): void {
    if (!mensagem) {
      throw new Error('É obrigatório definir uma mensagem');
    }
  }

  private validateCallback(callback: Function): void {
    if (!callback) {
      throw new Error('É obrigatório definir um callback');
    }
  }

  public saveCookies(data: any): void {
    localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, JSON.stringify(data));
  }

  public clearCookies(): void {
    localStorage.clear();
  }

  public isLogged(): any {
    const item = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
    return !!item;
  }

  public getAuth(): any {
    if (this.isLogged()) {
      return JSON.parse(localStorage.getItem(LOCALSTORAGE_TOKEN_KEY));
    }
    return null;
  }

  public getLogin(): string {
    if (this.isLogged()) {
      const obj = JSON.parse(localStorage.getItem(LOCALSTORAGE_TOKEN_KEY));
      return obj.email;
    }
    return null;
  }

  public getProfile(): any {
    if (this.isLogged()) {
      const obj = JSON.parse(localStorage.getItem(LOCALSTORAGE_TOKEN_KEY));
      return obj.profile;
    }
    return null;
  }

  public getToken(): string {
    if (this.isLogged()) {
      const obj = JSON.parse(localStorage.getItem(LOCALSTORAGE_TOKEN_KEY));
      return obj.token;
    }
    return null;
  }

  public getId(): string {
    if (this.isLogged()) {
      const obj = JSON.parse(localStorage.getItem(LOCALSTORAGE_TOKEN_KEY));
      return obj.id;
    }
    return null;
  }

  public getName(): string {
    if (this.isLogged()) {
      const obj = JSON.parse(localStorage.getItem(LOCALSTORAGE_TOKEN_KEY));
      return obj.name;
    }
    return null;
  }

  public goTo(router: Router, route: string, ...params: any[]): void {
    if (params && params.length) {
      router.navigate(this.separateArrays(route, params));
    } else {
      router.navigate([route]);
    }
    this.routeStack.push({
      route: route,
      caller: router.url,
      params: params ? params : []
    } as RouteStack);
  }

  private separateArrays(route: string, params): string[] {
    const array = []
    array.push(route);

    if (typeof params[0] === 'string') {
      array.push(params[0]);
      return array;
    }

    for (let i = 0; i < params[0].length; i++) {
      array.push(params[0][i]);
    }
    return array;
  }

  public formatCNPJ(cnpj: string): string {
    if (!this.stringIsNullOrEmpty(cnpj) && cnpj.length <= 14) {
      cnpj = cnpj.replace(/^(\d{2})(\d{3})?(\d{3})?(\d{4})?(\d{2})?/, '$1.$2.$3/$4-$5');
    }
    return cnpj;
  }

  public formatCPF(cpf) {
    if (!this.stringIsNullOrEmpty(cpf)) {
      cpf = cpf.replace(/[^\d]/g, '');
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
  }

  public formatRealMoney(value) {
    const formated = value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    return formated;
  }

  public formatPhone(number) {
    number = number.replace(/\D/g, '');
    number = number.replace(/^(\d{2})(\d)/g, '($1) $2');
    number = number.replace(/(\d)(\d{4})$/, '$1-$2');
    return number;
  }

  public formatCep(cep) {
    if (!this.stringIsNullOrEmpty(cep)) {
      const re = /^([\d]{2})\.?([\d]{3})\-?([\d]{3})/;
      return cep.replace(re, '$1$2-$3');
    }

    return;
  }

  public validateCpfAndCnpj(value: string): boolean {
    if (!this.stringIsNullOrEmpty(value)) {
      if (value.length === 14 && !this.validateCPF(value)) {
        return false;
      } else if (value.length === 18 && !this.validateCNPJ(value)) {
        return false;
      }
    }

    return true;
  }

  public validateCNPJ(cnpj: any): boolean {
    cnpj = cnpj.replace(/[^\d]+/g, '');
    if (cnpj === '') {
      return false;
    }
    if (cnpj.length !== 14) {
      return false;
    }

    if (cnpj === '00000000000000' ||
      cnpj === '11111111111111' ||
      cnpj === '22222222222222' ||
      cnpj === '33333333333333' ||
      cnpj === '44444444444444' ||
      cnpj === '55555555555555' ||
      cnpj === '66666666666666' ||
      cnpj === '77777777777777' ||
      cnpj === '88888888888888' ||
      cnpj === '99999999999999') {
      return false;
    }

    // Validate DVs
    let size = cnpj.length - 2;
    let numbers = cnpj.substring(0, size);
    const digits = cnpj.substring(size);
    let sum = 0;
    let pos = size - 7;
    for (let i = size; i >= 1; i--) {
      sum += numbers.charAt(size - i) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result !== parseInt(digits.charAt(0))) {
      return false;
    }
    size = size + 1;
    numbers = cnpj.substring(0, size);
    sum = 0;
    pos = size - 7;
    for (let i = size; i >= 1; i--) {
      sum += numbers.charAt(size - i) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    return result === parseInt(digits.charAt(1));
  }

  public validateCPF(cpf: any): boolean {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf === '') {
      return false;
    }
    if (cpf.length !== 11) {
      return false;
    }
    let sum;
    let rest;
    sum = 0;
    if (cpf === '00000000000') {
      return false;
    }

    for (let i = 1; i <= 9; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
    }
    rest = (sum * 10) % 11;

    if ((rest === 10) || (rest === 11)) {
      rest = 0;
    }
    if (rest !== parseInt(cpf.substring(9, 10), 10)) {
      return false;
    }

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
    }
    rest = (sum * 10) % 11;

    if ((rest === 10) || (rest === 11)) {
      rest = 0;
    }
    // tslint:disable-next-line: radix
    return rest === parseInt(cpf.substring(10, 11));
  }

  public stringIsNullOrEmpty(text: string): boolean {
    if (text != null && text !== undefined && text !== '') {
      return false;
    }
    return true;
  }

  public convertStates(val) {
    let data;

    if (!this.stringIsNullOrEmpty(val)) {
      switch (val.toUpperCase()) {
        /* UFs */
        case 'AC':
          data = 'Acre';
          break;
        case 'AL':
          data = 'Alagoas';
          break;
        case 'AM':
          data = 'Amazonas';
          break;
        case 'AP':
          data = 'Amapá';
          break;
        case 'BA':
          data = 'Bahia';
          break;
        case 'CE':
          data = 'Ceará';
          break;
        case 'DF':
          data = 'Distrito Federal';
          break;
        case 'ES':
          data = 'Espírito Santo';
          break;
        case 'GO':
          data = 'Goiás';
          break;
        case 'MA':
          data = 'Maranhão';
          break;
        case 'MG':
          data = 'Minas Gerais';
          break;
        case 'MS':
          data = 'Mato Grosso do Sul';
          break;
        case 'MT':
          data = 'Mato Grosso';
          break;
        case 'PA':
          data = 'Pará';
          break;
        case 'PB':
          data = 'Paraíba';
          break;
        case 'PE':
          data = 'Pernambuco';
          break;
        case 'PI':
          data = 'Piauí';
          break;
        case 'PR':
          data = 'Paraná';
          break;
        case 'RJ':
          data = 'Rio de Janeiro';
          break;
        case 'RN':
          data = 'Rio Grande do Norte';
          break;
        case 'RO':
          data = 'Rondônia';
          break;
        case 'RR':
          data = 'Roraima';
          break;
        case 'RS':
          data = 'Rio Grande do Sul';
          break;
        case 'SC':
          data = 'Santa Catarina';
          break;
        case 'SE':
          data = 'Sergipe';
          break;
        case 'SP':
          data = 'São Paulo';
          break;
        case 'TO':
          data = 'Tocantíns';
          break;

        /* Estados */
        case 'ACRE':
          data = 'AC';
          break;
        case 'ALAGOAS':
          data = 'AL';
          break;
        case 'AMAZONAS':
          data = 'AM';
          break;
        case 'AMAPÁ':
          data = 'AP';
          break;
        case 'BAHIA':
          data = 'BA';
          break;
        case 'CEARÁ':
          data = 'CE';
          break;
        case 'DISTRITO FEDERAL':
          data = 'DF';
          break;
        case 'ESPÍRITO SANTO':
          data = 'ES';
          break;
        case 'GOIÁS':
          data = 'GO';
          break;
        case 'MARANHÃO':
          data = 'MA';
          break;
        case 'MINAS GERAIS':
          data = 'MG';
          break;
        case 'MATO GROSSO DO SUL':
          data = 'MS';
          break;
        case 'MATO GROSSO':
          data = 'MT';
          break;
        case 'PARÁ':
          data = 'PA';
          break;
        case 'PARAÍBA':
          data = 'PB';
          break;
        case 'PERNAMBUCO':
          data = 'PE';
          break;
        case 'PIAUÍ':
          data = 'PI';
          break;
        case 'PARANÁ':
          data = 'PR';
          break;
        case 'RIO DE JANEIRO':
          data = 'RJ';
          break;
        case 'RIO GRANDE DO NORTE':
          data = 'RN';
          break;
        case 'RONDÔNIA':
          data = 'RO';
          break;
        case 'RORAIMA':
          data = 'RR';
          break;
        case 'RIO GRANDE DO SUL':
          data = 'RS';
          break;
        case 'SANTA CATARINA':
          data = 'SC';
          break;
        case 'SERGIPE':
          data = 'SE';
          break;
        case 'SÃO PAULO':
          data = 'SP';
          break;
        case 'TOCANTÍNS':
          data = 'TO';
          break;
      }
    }

    return data;
  }

  public removeMasks(value) {
    if (!this.stringIsNullOrEmpty(value)) {
      return value.replace(/[()-./ ]/g, '');
    }
  }

  public showNotification(icon, message, type) {
    $['notify']({
      icon: icon,
      message: message
    }, {
        type: type,
        delay: 3000,
        placement: {
          from: 'bottom',
          align: 'center'
        }
      });
  }

  public arraysEqual(a1, a2) {
    /* WARNING: arrays must not contain {objects} or behavior may be undefined */
    return JSON.stringify(a1) === JSON.stringify(a2);
  }

  public getConfirmSubscriber(modalRef: BsModalRef, modalService: BsModalService) {
    return (observer) => {
      const subscription = modalService.onHidden.subscribe(() => {
        if (modalRef.content.answer !== undefined && modalRef.content.answer !== null) {
          observer.next(modalRef.content.answer);
        }
        observer.complete();
      });

      return {
        unsubscribe() {
          subscription.unsubscribe();
        }
      };
    };
  }
}
