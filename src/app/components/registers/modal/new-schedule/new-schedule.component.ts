import { Component, OnInit, Inject, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UtilService } from 'src/app/util/util.service';
import { TagInputModule } from 'ngx-chips';

TagInputModule.withDefaults({
  tagInput: {
    placeholder: 'Adicione o(s) dia(s)',
    secondaryPlaceholder: 'Adicione o(s) dia(s)',
    onlyFromAutocomplete: true
  }
});

@Component({
  selector: 'new-schedule',
  templateUrl: './new-schedule.component.html',
  styleUrls: ['./new-schedule.component.scss']
})
export class NewScheduleComponent implements OnInit {
  public schedule: any;
  public invalid = false;
  public tagInputIsEmpty = false;
  public answer: any;
  public itemsTagInput = ['Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado', 'Domingo'];
  public itemsAdded = [];

  @Input('formGroup') fmSchedules: FormGroup;
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
    this.fmSchedules = this.formBuilder.group({
      id: ['', [

      ]],
      days: ['', []],
      startHour: ['', [
        Validators.required,
        Validators.minLength(5)
      ]],
      endHour: ['', [
        Validators.required,
        Validators.minLength(5)
      ]]
    });
  }

  private setFields() {
    if (this.schedule) {
      if (this.schedule.days.includes('/')) {
        this.itemsAdded = this.schedule.days.split('/');
      } else {
        this.itemsAdded.push(this.schedule.days);
      }

      this.fmSchedules.controls.id.setValue(this.schedule.id ? this.schedule.id : null);
      this.fmSchedules.controls.startHour.setValue(this.schedule.startHour);
      this.fmSchedules.controls.endHour.setValue(this.schedule.endHour);
    }
  }

  public onAddedTagInput(e: any) {
    this.itemsAdded.push(e.value);
  }

  public onRemoveTagInput(e: any) {
    const value = e.value;
    let index: number;

    if (!(value === undefined)) {
      index = this.itemsAdded.findIndex(element => element === value);
    } else {
      index = this.itemsAdded.findIndex(element => element === e);
    }

    this.itemsAdded.splice(index, 1);
  }

  public save() {
    if (this.fmSchedules.invalid || this.itemsAdded.length === 0) {
      this.invalid = true;
      this.tagInputIsEmpty = true;
      return;
    }

    /* Passando o valor do formulário para o componente pai */
    this.answer = {
      days: this.formatDays(this.itemsAdded),
      startHour: this.fmSchedules.controls.startHour.value,
      endHour: this.fmSchedules.controls.endHour.value
    };

    this.bsModalRef.hide();
  }

  private formatDays(days) {
    return days.reduce((accumulator, currentValue) => {
      const separator = ' / ';
      return accumulator + separator + currentValue;
    });
  }
}
