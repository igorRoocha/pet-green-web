import { CatererService } from './../../../services/registers/caterer.service';
import { Caterer } from './../../../models/caterer';
import { City } from './../../../models/city';
import { Address } from './../../../models/address';
import { UtilService } from 'src/app/util/util.service';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ContactRegisterComponent } from '../contact-register/contact-register.component';
import { SchedulesRegisterComponent } from '../schedules-register/schedules-register.component';
import { DropzoneComponent } from '../../dropzone/dropzone.component';
import { State } from 'src/app/models/state';
import { HttpStatus } from 'src/app/models/enum/http-status.enum';

@Component({
  selector: 'app-new-caterer',
  templateUrl: './new-caterer.component.html',
  styleUrls: ['./new-caterer.component.scss']
})
export class NewCatererComponent implements OnInit {
  private caterer: Caterer;
  private address: Address = new Address();
  private city: City = new City();
  private state: State = new State();
  private invalidCaterer: boolean;
  private invalidAddress: boolean;
  private statusFormCaterer: boolean;
  private statusFormAddress: boolean;

  @ViewChild(ContactRegisterComponent) contactRegisterComponent: ContactRegisterComponent;
  @ViewChild(DropzoneComponent) dropzoneComponent: DropzoneComponent;

  constructor(private router: Router,
              @Inject(UtilService) private utilService: UtilService,
              @Inject(CatererService) private catererService: CatererService) { }

  ngOnInit() {
  }

  public goTo(route: string) {
    this.utilService.goTo(this.router, route);
  }

  public getValuesCatererRegisterForm(res) {
    this.caterer = res.value;
    this.invalidCaterer = res.invalid;
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
    const alertMsg = 'Verifique se os formulários de cadastro estão preenchidos corretamente!';

    if (this.invalidCaterer || this.invalidAddress) {

      this.statusFormCaterer = this.invalidCaterer;
      this.statusFormAddress = this.invalidAddress;

      this.utilService.showNotification('fas fa-exclamation-triangle', alertMsg, 'warning');
      return;
    } else if (this.contactRegisterComponent.contacts === undefined || this.contactRegisterComponent.contacts.length === 0) {
      this.utilService.showNotification('fas fa-exclamation-triangle', alertMsg, 'warning');
      return;
    }

    this.setAddress();
    this.setCaterer();
    this.register();

  }

  private setAddress() {
    this.address.city = new City();
    this.address.city.state = new State();
    this.address.city = this.city;
    this.address.city.state = this.state;
  }

  private setCaterer() {
    this.caterer.address = this.address;
    this.caterer.contacts = this.contactRegisterComponent.contacts;
    this.caterer.userID = this.utilService.getUserId();

    if (this.dropzoneComponent.files !== undefined && this.dropzoneComponent.files.length > 0) {
      this.dropzoneComponent.readFile(this.dropzoneComponent.files[0]).then(content => {
        this.caterer.logo = content.toString();
      });
    }
  }

  private register() {
    let msg;
    let title;
    this.catererService.register(this.caterer).subscribe((c: any) => {
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
