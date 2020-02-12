import { SpecieService } from './../../../../services/registers/species.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, Inject, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilService } from 'src/app/util/util.service';
import { HttpStatus } from 'src/app/models/enum/http-status.enum';

@Component({
  selector: 'new-species',
  templateUrl: './new-species.component.html',
  styleUrls: ['./new-species.component.scss']
})
export class NewSpeciesComponent implements OnInit {
  public specie: any;
  public answer: any;
  public invalid = false;

  @Input('formGroup') fmSpecies: FormGroup;
  @Output('fmChanged') fmChanged = new EventEmitter();

  constructor(public bsModalRef: BsModalRef,
              @Inject(FormBuilder) private formBuilder: FormBuilder,
              @Inject(UtilService) private utilService: UtilService,
              @Inject(SpecieService) private specieService: SpecieService) { }

  ngOnInit() {
    this.formControls();
    this.setFields();
  }

  private formControls() {
    this.fmSpecies = this.formBuilder.group({
      name: ['', [
        Validators.required
      ]]
    });

    this.fmSpecies.valueChanges.subscribe(() => {
      this.fmChanged.emit(this.fmSpecies);
    });
  }

  public setFields() {
    if (this.specie) {
      this.fmSpecies.controls.name.setValue(this.specie.name);
    }
  }

  public save() {
    if (this.fmSpecies.invalid) {
      this.invalid = true;
      return;
    }

    this.answer = {
      name: this.fmSpecies.controls.name.value,
    };

    if (!this.specie) {
      this.register(this.answer);
    } else {
      this.specie.name = this.answer.name;
      this.edit(this.specie);
    }
  }

  private register(specie) {
    let msg;
    let title;

    this.specieService.register(specie).subscribe(() => {
      this.bsModalRef.hide();
    }, err => {
      if (err.status === HttpStatus.BAD_REQUEST || err.status === HttpStatus.NOT_FOUND || err.status === HttpStatus.INTERNAL_SERVER_ERROR) {
        title = 'Ocorreu um erro durante o cadastro de espécie :(';
        msg = 'Por favor, entre em contato com nossa equipe para resolvermos o problema o mais breve possível.';
        this.utilService.errorMsg(msg, title, () => { });
        console.log(err);
      }

      if (err.status === HttpStatus.CONFLICT) {
        this.fmSpecies.controls.name.setErrors({ exists: true });
      }
    });
  }

  private edit(specie) {
    let msg;
    let title;

    this.specieService.edit(specie).subscribe(() => {
      this.bsModalRef.hide();
    }, err => {
      if (err.status === HttpStatus.BAD_REQUEST || err.status === HttpStatus.NOT_FOUND || err.status === HttpStatus.INTERNAL_SERVER_ERROR) {
        title = 'Ocorreu um erro durante o edição de espécie :(';
        msg = 'Por favor, entre em contato com nossa equipe para resolvermos o problema o mais breve possível.';
        this.utilService.errorMsg(msg, title, () => { });
        console.log(err);
      }

      if (err.status === HttpStatus.CONFLICT) {
        this.fmSpecies.controls.name.setErrors({ exists: true });
      }
    });
  }
}
