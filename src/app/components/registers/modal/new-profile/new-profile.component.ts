import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, Inject, Input, EventEmitter, Output } from '@angular/core';
import { UtilService } from 'src/app/util/util.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-profile',
  templateUrl: './new-profile.component.html',
  styleUrls: ['./new-profile.component.scss']
})
export class NewProfileComponent implements OnInit {
  public title: string;
  public answer: any;
  public invalid = false;
  public permissions: any[] = [{name: 'Cadastros'},{name: 'Cadastros'},{name: 'Cadastros'},{name: 'Cadastros'},{name: 'Cadastros'},{name: 'Cadastros'},{name: 'Cadastros'},{name: 'Cadastros'}];

  @Input('fmProfile') fmProfile: FormGroup;
  @Output('fmChanged') fmChanged = new EventEmitter();

  constructor(public bsModalRef: BsModalRef,
    @Inject(FormBuilder) private formBuilder: FormBuilder,
    @Inject(UtilService) private utilService: UtilService,) { }

  ngOnInit() {
    this.formControls();
    this.getPermissions();
  }

  private formControls() {
    this.fmProfile = this.formBuilder.group({
      name: ['', [
        Validators.required
      ]],
      specie: ['', [
        Validators.required
      ]]
    });

    this.fmProfile.valueChanges.subscribe(() => {
      this.fmChanged.emit(this.fmProfile);
    });
  }

  public getPermissions() {

  }

  public onValueChange(e, permission) {
    console.log(e);
    console.log(permission);
  }

  public save() {

  }
}
