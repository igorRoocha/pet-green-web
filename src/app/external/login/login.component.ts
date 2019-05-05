import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;
  constructor(@Inject(FormBuilder) private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formControls();
  }

  formControls() {
    this.formLogin = this.formBuilder.group({
      username: ['', [

      ]],
      password: ['',[

      ]]
    });
  }
}