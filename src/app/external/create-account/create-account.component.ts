import { UtilService } from './../../util/util.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  public formAccountRegister: FormGroup;

  public focusName;
  public focusEmail;
  public focusPassword;
  public focusConfirmPassword;
  public focusContact;

  constructor(@Inject(FormBuilder) private formBuilder: FormBuilder,
    @Inject(UtilService) private utilService: UtilService) { }

  ngOnInit() {
    this.formControls();
  }

  get f() { return this.formAccountRegister.controls; }

  formControls() {
    this.formAccountRegister = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.pattern('[a-zA-Z ]*')
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      contact: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]],
      confirmPassword: ['', [
        Validators.required
      ]]
    });
  }

  public validateConfirmPassword() {
    if (!this.utilService.stringIsNullOrEmpty(this.f.password.value) &&
        !this.utilService.stringIsNullOrEmpty(this.f.confirmPassword.value)) {
      if (this.f.password.value !== this.f.confirmPassword.value) {
        this.f.confirmPassword.setErrors({ 'incorrect': true });
      }
    }
  }
}
