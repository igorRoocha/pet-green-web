import { HttpStatus } from './../../../models/enum/http-status.enum';
import { ClinicService } from './../../../services/clinic.service';
import { Address } from './../../../models/address';
import { Clinic } from './../../../models/clinic';
import { ContactRegisterComponent } from './../../../components/registers/contact-register/contact-register.component';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { UtilService } from 'src/app/util/util.service';
import { SchedulesRegisterComponent } from 'src/app/components/registers/schedules-register/schedules-register.component';
import { DropzoneComponent } from 'src/app/components/dropzone/dropzone.component';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.scss']
})
export class ClinicComponent implements OnInit {
  private clinic: Clinic;
  private address: Address;
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
    this.invalidAddress = res.invalid;
  }

  public save() {
    let alertMsg;

    if (this.invalidClinic || this.invalidAddress || this.address === undefined) {
      alertMsg = 'Verifique se os formulários "Dados Gerais" e "Endereço" estão preenchidos corretamente.';

      this.statusFormClinic = this.invalidClinic;
      this.statusFormAddress = this.invalidAddress;

      this.utilService.showNotification('fas fa-exclamation-triangle', alertMsg, 'warning');
      return;
    } else if ((this.schedulesRegisterComponent.schedules === undefined || this.schedulesRegisterComponent.schedules.length === 0) ||
      (this.contactRegisterComponent.contacts === undefined || this.contactRegisterComponent.contacts.length === 0)) {
      alertMsg = 'Verifique se os formulários "Contatos" e "Horário de Funcionamento" estão preenchidos corretamente.';
      this.utilService.showNotification('fas fa-exclamation-triangle', alertMsg, 'warning');
      return;
    }

    this.setClinic();
    this.register();

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

    }, err => {
      if (err.status === HttpStatus.BAD_REQUEST || err.status === HttpStatus.NOT_FOUND) {
        title = 'Ocorreu um erro durante o cadastro de empresa :(';
        msg = 'Por favor, entre em contato com nossa equipe para resolvermos o problema o mais breve possível.';
        this.utilService.errorMsg(msg, title, () => { });
      }
    });
  }
}
