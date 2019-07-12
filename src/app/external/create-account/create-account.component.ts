import { Router } from '@angular/router';
import { HttpStatus } from '../../models/enum/http-status.enum';
import { UserService } from './../../services/user.service';
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

  public invalid = false;

  constructor(
    private router: Router,
    @Inject(FormBuilder) private formBuilder: FormBuilder,
    @Inject(UtilService) private utilService: UtilService,
    @Inject(UserService) private userService: UserService) { }

  ngOnInit() {
    this.formControls();
  }

  get f() { return this.formAccountRegister.controls; }

  formControls() {
    this.formAccountRegister = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.pattern('^([a-zA-Z]|[à-ú]|[À-Ú ])+$')
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

  public confirmPassword() {
    if (!this.utilService.stringIsNullOrEmpty(this.f.password.value) &&
      !this.utilService.stringIsNullOrEmpty(this.f.confirmPassword.value)) {
      if (this.f.password.value !== this.f.confirmPassword.value) {
        this.f.confirmPassword.setErrors({ 'incorrect': true });
      }
    }
  }

  public register() {
    if (this.formAccountRegister.invalid) {
      this.invalid = true;
      return;
    }

    let user = this.formAccountRegister.value;
    user.contact = this.utilService.removeMasks(this.f.contact.value);

    this.userService.post(user).subscribe((x: any) => {
      this.utilService.successMsg('Cadastro realizado com sucesso! Faça o login para continuar', () => {
        this.formAccountRegister.reset();
        this.utilService.goTo(this.router, 'login');
      });
    }, err => {
      if (err.status === HttpStatus.CONFLICT) {
        this.f.email.setErrors({ 'userFound': true });
      }
    });
  }
}
