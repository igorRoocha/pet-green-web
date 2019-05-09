import { TelefoneFilter } from './telefone-filter';
import { CpfFilter } from './cpf-filter';
import { HourDirective } from './hour.directive';
import { DateDirective } from './date.directive';
import { CnpjDirective } from './cnpj.directive';
import { CepDirective } from './cep.directive';
import { AmountDirective } from './amount.directive';
import { NgModule } from '@angular/core';
import { TelefoneDirective } from './telefone.directive';
import { CpfCnpjDirective } from './cpf-cnjp.directive';
import { CurrencyFormatPipe } from './currency-format.pipe';
import { RgDirective } from './rg.directive';
import { RgFilter } from './rg-filter';

@NgModule({
  declarations: [
    AmountDirective,
    CepDirective,
    CnpjDirective,
    CpfCnpjDirective,
    CpfFilter,
    CurrencyFormatPipe,
    DateDirective,
    HourDirective,
    RgDirective,
    RgFilter,
    TelefoneDirective,
    TelefoneFilter
  ],
  exports: [
    AmountDirective,
    CepDirective,
    CnpjDirective,
    CpfCnpjDirective,
    CpfFilter,
    CurrencyFormatPipe,
    DateDirective,
    HourDirective,
    RgDirective,
    RgFilter,
    TelefoneDirective,
    TelefoneFilter
  ]
})
export class DirectiveModule { }
