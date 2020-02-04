import { UtilService } from '../../../util/util.service';
import { AddressService } from '../../../services/address.service';
import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpStatus } from 'src/app/models/enum/http-status.enum';

@Component({
  selector: 'address-register',
  templateUrl: './address-register.component.html',
  styleUrls: ['./address-register.component.scss']
})
export class AddressRegisterComponent implements OnInit {
  private formAddress: FormGroup;

  @Input('invalidForm') invalidForm: boolean;
  @Output('resComponent') resComponent = new EventEmitter();

  constructor(@Inject(FormBuilder) private formBuilder: FormBuilder,
    @Inject(AddressService) private addressService: AddressService,
    @Inject(UtilService) private utilService: UtilService) { }

  ngOnInit() {
    this.formControls();
  }

  get fa() { return this.formAddress.controls; }

  formControls() {
    if (!this.formAddress) {
      this.formAddress = this.formBuilder.group({
        postcode: ['', [
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

        ]]
      });

      this.formAddress.valueChanges.subscribe(() => {
        this.resComponent.emit(this.formAddress);
      });
    }
  }

  public consultCep(cep: string) {
    if (!this.utilService.stringIsNullOrEmpty(cep)) {
      this.addressService.consultCep(cep).subscribe((address: any) => {
        if (!!address.erro) {
          this.fa.postcode.setErrors({ 'incorrect': true });
        } else {
          this.fa.city.setValue(address.localidade);
          this.fa.street.setValue(address.logradouro);
          this.fa.state.setValue(this.utilService.convertStates(address.uf));
          this.fa.neighborhood.setValue(address.bairro);
        }
      }, () => {
        if (HttpStatus.BAD_REQUEST) {
          this.fa.postcode.setErrors({ 'incorrect': true });
        }
      });
    }
  }

}
