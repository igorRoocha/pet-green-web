import { BreedService } from './../../../../services/registers/breed.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, Inject, Input, EventEmitter, Output } from '@angular/core';
import { UtilService } from 'src/app/util/util.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpecieService } from 'src/app/services/registers/species.service';
import { HttpStatus } from 'src/app/models/enum/http-status.enum';

@Component({
  selector: 'app-new-breed',
  templateUrl: './new-breed.component.html',
  styleUrls: ['./new-breed.component.scss']
})
export class NewBreedComponent implements OnInit {
  public breed: any;
  public species: any;
  public answer: any;
  public invalid = false;
  public title: string;

  @Input('fmBreed') fmBreed: FormGroup;
  @Output('fmChanged') fmChanged = new EventEmitter();

  constructor(public bsModalRef: BsModalRef,
    @Inject(FormBuilder) private formBuilder: FormBuilder,
    @Inject(UtilService) private utilService: UtilService,
    @Inject(SpecieService) private specieService: SpecieService,
    @Inject(BreedService) private breedService: BreedService) { }

  ngOnInit() {
    this.formControls();
    this.setFields();
    this.getSpecies();
  }

  private formControls() {
    this.fmBreed = this.formBuilder.group({
      name: ['', [
        Validators.required
      ]],
      specie: ['', [
        Validators.required
      ]]
    });

    this.fmBreed.valueChanges.subscribe(() => {
      this.fmChanged.emit(this.fmBreed);
    });
  }

  private setFields() {
    if (this.breed) {
      this.fmBreed.controls.name.setValue(this.breed.name);
      this.fmBreed.controls.specie.setValue(this.breed.specie.id);
    }
  }

  private getSpecies() {
    let title;
    let msg;

    this.specieService.get().subscribe((s: any) => {
      this.species = s;
    }, err => {
      if (err.status === HttpStatus.BAD_REQUEST || err.status === HttpStatus.NOT_FOUND || err.status === HttpStatus.INTERNAL_SERVER_ERROR) {
        title = 'Ocorreu um erro durante a busca de raças :(';
        msg = 'Por favor, entre em contato com nossa equipe para resolvermos o problema o mais breve possível.';
        this.utilService.errorMsg(msg, title, () => { });
        console.log(err);
      }
    });
  }

  public save() {
    if (this.fmBreed.invalid) {
      this.invalid = true;
      return;
    }

    if (!this.breed) {
      this.answer = {
        name: this.fmBreed.controls.name.value,
        specie: this.species.find(s => s.id === this.fmBreed.controls.specie.value),
      };

      this.register(this.answer);
    } else {
      this.answer = {
        id: this.breed.id,
        name: this.fmBreed.controls.name.value,
        specie: this.species.find(s => s.id === this.fmBreed.controls.specie.value),
        specieID: this.species.find(s => s.id === this.fmBreed.controls.specie.value).id
      }

      this.edit(this.answer);
    }
  }

  private register(breed) {
    let msg;
    let title;

    this.breedService.register(breed).subscribe(() => {
      this.bsModalRef.hide();
    }, err => {
      if (err.status === HttpStatus.BAD_REQUEST || err.status === HttpStatus.NOT_FOUND || err.status === HttpStatus.INTERNAL_SERVER_ERROR) {
        title = 'Ocorreu um erro durante o cadastro de raça :(';
        msg = 'Por favor, entre em contato com nossa equipe para resolvermos o problema o mais breve possível.';
        this.utilService.errorMsg(msg, title, () => { });
        console.log(err);
      }

      if (err.status === HttpStatus.CONFLICT) {
        this.fmBreed.controls.name.setErrors({ exists: true });
      }
    });
  }

  private edit(breed) {
    let msg;
    let title;

    this.breedService.edit(breed).subscribe(() => {
      this.bsModalRef.hide();
    }, err => {
      if (err.status === HttpStatus.BAD_REQUEST || err.status === HttpStatus.NOT_FOUND || err.status === HttpStatus.INTERNAL_SERVER_ERROR) {
        title = 'Ocorreu um erro durante o edição de raça :(';
        msg = 'Por favor, entre em contato com nossa equipe para resolvermos o problema o mais breve possível.';
        this.utilService.errorMsg(msg, title, () => { });
        console.log(err);
      }

      if (err.status === HttpStatus.CONFLICT) {
        this.fmBreed.controls.name.setErrors({ exists: true });
      }
    });
  }
}
