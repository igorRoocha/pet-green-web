import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilService } from 'src/app/util/util.service';

@Component({
  selector: 'app-clinic-register',
  templateUrl: './clinic-register.component.html',
  styleUrls: ['./clinic-register.component.scss']
})
export class ClinicRegisterComponent implements OnInit {
  public formGeneralData: FormGroup;

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

      ]]
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
