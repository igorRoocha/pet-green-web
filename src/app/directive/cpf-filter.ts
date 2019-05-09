import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'cpf'
})
export class CpfFilter implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }

    if (value.length !== 11) {
      return value;
    }

    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '\$1.\$2.\$3\-\$4');
  }

}
