import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'cnpj'
})
export class CnpjFilter implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }

    if (value.length !== 14) {
      return value;
    }

    return value.replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/,"$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3")
    .replace(/\.(\d{3})(\d)/,".$1/$2")
    .replace(/(\d{4})(\d)/,"$1-$2");
  }
}