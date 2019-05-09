import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'rg'
})
export class RgFilter implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }

    if (value.length !== 9) {
      return value;
    }

    return value.replace(/(\d{2})(\d{3})(\d{3})(\d)/g, '\$1.\$2.\$3\-\$4');
  }

}
