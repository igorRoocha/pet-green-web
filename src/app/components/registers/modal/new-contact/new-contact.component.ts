import { UtilService } from './../../../../util/util.service';
import { Component, OnInit, Input, Output, Inject, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import 'bootstrap-notify';

@Component({
  selector: 'new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss']
})
export class NewContactComponent implements OnInit {
  public title;
  public invalid = false;
  public contact: any;
  public answer: any;

  @Input('formGroup') fmContact: FormGroup;
  @Output('fmChanged') fmChanged = new EventEmitter();

  constructor(
    public bsModalRef: BsModalRef,
    @Inject(FormBuilder) private formBuilder: FormBuilder,
    @Inject(UtilService) private utilService: UtilService) { }

  ngOnInit() {
    this.formControls();
    this.setFields();
  }

  private formControls() {
    this.fmContact = this.formBuilder.group({
      contactType: ['', [
        Validators.required
      ]],
      number: ['', [
        Validators.required,
        Validators.minLength(14),
      ]]
    });

    this.fmContact.valueChanges.subscribe(() => {
      this.fmChanged.emit(this.fmContact);
    });
  }

  private setFields() {
    if (this.contact) {
      this.fmContact.controls.contactType.setValue(this.contact.contactType);
      this.fmContact.controls.number.setValue(this.utilService.formatPhone(this.contact.number));
    }
  }

  public save() {
    if (this.fmContact.invalid) {
      this.invalid = true;
      return;
    }
    /* Passando o valor do formulário para o componente pai */
    this.answer = {
      contactType: this.fmContact.controls.contactType.value,
      number: this.utilService.formatPhone(this.fmContact.controls.number.value)
    };

    this.bsModalRef.hide();
  }
}
