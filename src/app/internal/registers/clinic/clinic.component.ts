import { state } from '@angular/animations';
import { HttpStatus } from './../../../models/enum/http-status.enum';
import { ClinicService } from './../../../services/clinic.service';
import { Address } from './../../../models/address';
import { Clinic } from './../../../models/clinic';
import { ContactRegisterComponent } from './../../../components/registers/contact-register/contact-register.component';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { UtilService } from 'src/app/util/util.service';
import { SchedulesRegisterComponent } from 'src/app/components/registers/schedules-register/schedules-register.component';
import { DropzoneComponent } from 'src/app/components/dropzone/dropzone.component';
import { State } from 'src/app/models/state';
import { City } from 'src/app/models/city';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.scss']
})
export class ClinicComponent implements OnInit {
  private clinic: Clinic;
  private address: Address = new Address();
  private city: City = new City();
  private state: State = new State();
  private invalidClinic: boolean;
  private invalidAddress: boolean;
  private statusFormClinic: boolean;
  private statusFormAddress: boolean;

  @ViewChild(ContactRegisterComponent) contactRegisterComponent: ContactRegisterComponent;
  @ViewChild(SchedulesRegisterComponent) schedulesRegisterComponent: SchedulesRegisterComponent;
  @ViewChild(DropzoneComponent) dropzoneComponent: DropzoneComponent;

  constructor(@Inject(UtilService) private utilService: UtilService,
    @Inject(ClinicService) private clinicService: ClinicService) { }

  ngOnInit() {
  }

  public getValuesClinicRegisterForm(res) {
    this.clinic = res.value;
    this.invalidClinic = res.invalid;
  }

  public getValuesAddressRegisterForm(res) {
    this.address = res.value;

    this.city.name = res.value.city;
    this.city.ibge = res.value.ibge;

    this.state.name = res.value.state;
    this.state.uf = res.value.uf;

    this.invalidAddress = res.invalid;
  }

  public save() {
    const alertMsg = 'Verifique se os formulários de cadastro preenchidos corretamente!';

    if (this.invalidClinic || this.invalidAddress || this.address === undefined) {

      this.statusFormClinic = this.invalidClinic;
      this.statusFormAddress = this.invalidAddress;

      this.utilService.showNotification('fas fa-exclamation-triangle', alertMsg, 'warning');
      return;
    } else if ((this.schedulesRegisterComponent.schedules === undefined || this.schedulesRegisterComponent.schedules.length === 0) ||
      (this.contactRegisterComponent.contacts === undefined || this.contactRegisterComponent.contacts.length === 0)) {
      this.utilService.showNotification('fas fa-exclamation-triangle', alertMsg, 'warning');
      return;
    }

    this.setAddress();
    this.setClinic();
    this.register();

  }

  private setAddress() {
    this.address.city = new City();
    this.address.city.state = new State();
    this.address.city = this.city;
    this.address.city.state = this.state;
  }

  private setClinic() {
    this.clinic.address = this.address;
    this.clinic.contacts = this.contactRegisterComponent.contacts;
    this.clinic.schedules = this.schedulesRegisterComponent.schedules;

    if (this.dropzoneComponent.files !== undefined && this.dropzoneComponent.files.length > 0) {
      this.dropzoneComponent.readFile(this.dropzoneComponent.files[0]).then(content => {
        this.clinic.logo = content.toString();
      });
    }
  }

  private register() {
    let msg;
    let title;
    this.clinicService.register(this.clinic).subscribe((c: any) => {
      this.utilService.successMsg('Cadastrado com sucesso!', () => {});
    }, err => {
      if (err.status === HttpStatus.BAD_REQUEST || err.status === HttpStatus.NOT_FOUND) {
        title = 'Ocorreu um erro durante o cadastro de empresa :(';
        msg = 'Por favor, entre em contato com nossa equipe para resolvermos o problema o mais breve possível.';
        this.utilService.errorMsg(msg, title, () => { });
      }

      if (err.status === HttpStatus.CONFLICT) {
        this.utilService.alertMsg('Foi encontrado um cadastro no sistema com o mesmo CPF/CNPJ.', () => {});
      }
    });
  }
}
