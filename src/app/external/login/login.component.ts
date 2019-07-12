import { UtilService } from './../../util/util.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpStatus } from 'src/app/models/enum/http-status.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;
  public unauthorized = false;

  constructor(
    private router: Router,
    @Inject(FormBuilder) private formBuilder: FormBuilder,
    @Inject(UserService) private userService: UserService,
    @Inject(UtilService) private utilService: UtilService) { }

  ngOnInit() {
    this.formControls();
    this.utilService.clearCookies();
  }

  formControls() {
    this.formLogin = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required
      ]]
    });
  }

  get f() { return this.formLogin.controls; }

  public login() {
    if (this.formLogin.invalid) {
      return;
    }

    this.userService.login(this.formLogin.value).subscribe((x: any) => {
      this.utilService.saveCookies(x);
      this.utilService.goTo(this.router, 'app/home');
    }, err => {
      if (err.status === HttpStatus.NOT_FOUND) {
        this.f.email.setErrors({ 'cannotFoundAccount': true });
      }

      if (err.status === HttpStatus.UNAUTHORIZED) {
        this.unauthorized = true;
      }
    });
  }
}
