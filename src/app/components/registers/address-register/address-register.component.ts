import { Address } from './../../../models/address';
import { UtilService } from '../../../util/util.service';
import { AddressService } from '../../../services/address.service';
import { Component, OnInit, Inject, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpStatus } from 'src/app/models/enum/http-status.enum';

@Component({
  selector: 'address-register',
  templateUrl: './address-register.component.html',
  styleUrls: ['./address-register.component.scss']
})
export class AddressRegisterComponent implements OnChanges {
  private formAddress: FormGroup;

  @Input('invalidForm') invalidForm: boolean;
  @Input('address') address: Address = new Address();
  @Output('resComponent') resComponent = new EventEmitter();

  constructor(@Inject(FormBuilder) private formBuilder: FormBuilder,
    @Inject(AddressService) private addressService: AddressService,
    @Inject(UtilService) private utilService: UtilService) {
  }

  ngOnChanges() {
    this.formControls();
    this.setForm();
  }

  get fa() { return this.formAddress.controls; }

  formControls() {
    if (!this.formAddress) {
      this.formAddress = this.formBuilder.group({
        id: ['', [

        ]],
        IDCity: ['', [

        ]],
        IDState: ['', [

        ]],
        cep: ['', [
          Validators.required,
        ]],
        number: ['', [
          Validators.required
        ]],
        street: ['', [
          Validators.required
        ]],
        neighborhood: ['', [
          Validators.required
        ]],
        city: ['', [
          Validators.required
        ]],
        state: ['', [
          Validators.required
        ]],
        complement: ['', [

        ]],
        ibge: ['', []],
        uf: ['', []]
      });

      this.formAddress.valueChanges.subscribe(() => {
        this.resComponent.emit(this.formAddress);
      });
    }
  }

  private setForm() {
    if (this.address.city && this.address.city.state) {
        this.formAddress.controls.city.setValue(this.address.city.name);
        this.formAddress.controls.IDCity.setValue(this.address.city.id);

        this.formAddress.controls.state.setValue(this.address.city.state.name);
        this.formAddress.controls.IDState.setValue(this.address.city.state.id);
    }
  }

  public consultCep(cep: string) {
    if (!this.utilService.stringIsNullOrEmpty(cep)) {
      this.addressService.consultCep(cep).subscribe((address: any) => {
        if (!!address.erro) {
          this.fa.cep.setErrors({ 'incorrect': true });
        } else {
          this.fa.city.setValue(address.localidade);
          this.fa.street.setValue(address.logradouro);
          this.fa.state.setValue(this.utilService.convertStates(address.uf));
          this.fa.neighborhood.setValue(address.bairro);
          this.fa.ibge.setValue(address.ibge);
          this.fa.uf.setValue(address.uf);
        }
      }, () => {
        if (HttpStatus.BAD_REQUEST) {
          this.fa.cep.setErrors({ 'incorrect': true });
        }
      });
    }
  }

}
