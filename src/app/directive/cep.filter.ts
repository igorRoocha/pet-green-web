import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'cep'
})
export class CepFilter implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }

    if (value.length !== 8) {
      return value;
    }

    return value.replace(/\D/g, '').replace(/^(\d{5})(\d)/,"$1-$2");
  }
}