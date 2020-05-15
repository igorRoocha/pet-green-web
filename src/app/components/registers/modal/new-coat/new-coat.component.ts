import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, Output, Input, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilService } from 'src/app/util/util.service';

@Component({
  selector: 'app-new-coat',
  templateUrl: './new-coat.component.html',
  styleUrls: ['./new-coat.component.scss']
})
export class NewCoatComponent implements OnInit {
  public  title: string;
  public invalid: boolean;
  @Input('fmCoat') fmCoat: FormGroup;
  @Output('fmChanged') fmChanged = new EventEmitter();

  constructor(public bsModalRef: BsModalRef,
    @Inject(FormBuilder) private formBuilder: FormBuilder,
    @Inject(UtilService) private utilService: UtilService) { }

  ngOnInit() {
    this.formControls();
  }

  private formControls() {
    this.fmCoat = this.formBuilder.group({
      name: ['', [
        Validators.required
      ]]
    });
  }

  public save() {

  }

}
