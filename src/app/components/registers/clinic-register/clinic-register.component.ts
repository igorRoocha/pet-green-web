import { UtilService } from './../../../util/util.service';
import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'clinic-register',
  templateUrl: './clinic-register.component.html',
  styleUrls: ['./clinic-register.component.scss']
})
export class ClinicRegisterComponent implements OnInit {
  private formGeneralData: FormGroup;
  @Input('invalidForm') invalidForm: boolean;
  @Output('resComponent') resComponent = new EventEmitter();

  constructor(@Inject(FormBuilder) private formBuilder: FormBuilder,
    @Inject(UtilService) private utilService: UtilService) { }

  ngOnInit() {
    this.formControls();
  }

  get fgd() { return this.formGeneralData.controls; }

  private formControls() {
    this.formGeneralData = this.formBuilder.group({
      name: ['', [
        Validators.required
      ]],
      taxId: ['', [
        Validators.required,
        Validators.minLength(14)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      socialReason: ['', [

      ]],
      site: ['', [

      ]],
      facebook: ['', [

      ]]
    });

    this.formGeneralData.valueChanges.subscribe(() => {
      this.resComponent.emit(this.formGeneralData);
    });
  }

  public validateTaxId(taxId: string) {
    if (!this.utilService.stringIsNullOrEmpty(taxId) && !this.utilService.validateCpfAndCnpj(taxId)) {
      this.fgd.taxId.setErrors({ 'invalid': true });
    }
  }

  public validateSocialReason(socialReason: string) {
    if (this.utilService.stringIsNullOrEmpty(socialReason)) {
      this.fgd.socialReason.setErrors({ 'required': true });
    }
  }
}