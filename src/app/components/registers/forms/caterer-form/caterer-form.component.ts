import { Caterer } from './../../../../models/caterer';
import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilService } from 'src/app/util/util.service';

@Component({
  selector: 'caterer-form',
  templateUrl: './caterer-form.component.html',
  styleUrls: ['./caterer-form.component.scss']
})
export class CatererFormComponent implements OnInit {
  public formGeneralData: FormGroup;
  @Input('invalidForm') invalidForm: boolean;
  @Input('caterer') caterer: Caterer = new Caterer();
  @Output('resComponent') resComponent: EventEmitter<any> = new EventEmitter();

  constructor(@Inject(FormBuilder) private formBuilder: FormBuilder,
  @Inject(UtilService) private utilService: UtilService) { }

  ngOnInit() {
    this.formControls();
  }

  get fgd() { return this.formGeneralData.controls; }

  private formControls() {
    this.formGeneralData = this.formBuilder.group({
      id: ['', [

      ]],
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
        Validators.required
      ]],
      stateRegistration: ['',[

      ]]
    });

    this.formGeneralData.valueChanges.subscribe(() => {
      this.resComponent.emit(this.formGeneralData);
    });
  }

  public validateTaxId(taxId: string) {
    if (!this.utilService.stringIsNullOrEmpty(taxId) && !this.utilService.validateCNPJ(taxId)) {
      this.fgd.taxId.setErrors({ 'invalid': true });
    }
  }
}
