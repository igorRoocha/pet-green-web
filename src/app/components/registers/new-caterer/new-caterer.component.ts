import { CatererService } from './../../../services/registers/caterer.service';
import { Caterer } from './../../../models/caterer';
import { City } from './../../../models/city';
import { Address } from './../../../models/address';
import { UtilService } from 'src/app/util/util.service';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ContactRegisterComponent } from '../contact-register/contact-register.component';
import { DropzoneComponent } from '../../dropzone/dropzone.component';
import { State } from 'src/app/models/state';
import { HttpStatus } from 'src/app/models/enum/http-status.enum';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-new-caterer',
  templateUrl: './new-caterer.component.html',
  styleUrls: ['./new-caterer.component.scss']
})
export class NewCatererComponent implements OnInit {
  public caterer: Caterer;
  public address: Address = new Address();
  public contacts: Contact[];
  public files: File[] = [];

  private catererFromState: Caterer;
  private isEdit: boolean;
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
    @Inject(CatererService) private catererService: CatererService) {
    this.caterer = new Caterer();
    this.getDataFromRouter();
  }

  ngOnInit() {
  }

  private getDataFromRouter() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as { caterer: any };

    if (state && state.caterer !== undefined) {
      this.isEdit = true;
      this.catererFromState = state.caterer;
      this.caterer = state.caterer;
      this.address = state.caterer.address[0];
      this.contacts = state.caterer.contacts;
      this.files = state.caterer.logo;
    }
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
    this.city.id = this.utilService.stringIsNullOrEmpty(res.value.IDCity) ? null : res.value.IDCity;

    this.state.name = res.value.state;
    this.state.uf = res.value.uf;
    this.state.id = this.utilService.stringIsNullOrEmpty(res.value.IDState) ? null : res.value.IDState;

    this.invalidAddress = res.invalid;
  }

  public save() {
    const alertMsg = 'Verifique se todos os campos estão preenchidos corretamente!';

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
  }

  private setAddress() {
    this.address.city = new City();
    this.address.city.state = new State();
    this.address.city = this.city;
    this.address.city.state = this.state;
  }

  private setCaterer() {
    this.caterer.address = [];
    this.caterer.address.push(this.address);
    this.caterer.contacts = this.contactRegisterComponent.contacts;
    this.caterer.userID = this.utilService.getUserId();

    if (this.dropzoneComponent.files !== undefined && this.dropzoneComponent.files.length > 0) {
      this.dropzoneComponent.readFile(this.dropzoneComponent.files[0]).then(content => {
        this.caterer.logo = content.toString();

        if (!this.isEdit) {
          this.register();
        } else {
          this.edit();
        }
      });
    } else {
      if (!this.isEdit) {
        this.register();
      } else {
        this.edit();
      }

    }
  }

  private register() {
    let msg;
    let title;

    console.log(this.caterer);
    this.catererService.register(this.caterer).subscribe((c: any) => {
      this.utilService.successMsg('Cadastrado com sucesso!', () => {
        this.goTo('app/fornecedores');
      });
    }, err => {
      if (err.status === HttpStatus.BAD_REQUEST || err.status === HttpStatus.NOT_FOUND) {
        title = 'Ocorreu um erro durante o cadastro de fornecedor';
        msg = 'Por favor, entre em contato com nossa equipe para resolvermos o problema o mais breve possível.';
        this.utilService.errorMsg(msg, title, () => { });
      }

      if (err.status === HttpStatus.CONFLICT) {
        this.utilService.alertMsg('Foi encontrado um cadastro no sistema com o mesmo CPF/CNPJ.', () => { });
      }
    });
  }

  private edit() {
    let msg;
    let title;
    this.catererService.edit(this.caterer).subscribe((c: any) => {
      this.utilService.successMsg('Alterado com sucesso!', () => {
        this.goTo('app/fornecedores');
      });
    }, err => {
      if (err.status === HttpStatus.BAD_REQUEST || err.status === HttpStatus.NOT_FOUND ||
          err.status === HttpStatus.INTERNAL_SERVER_ERROR) {
        title = 'Ocorreu um erro durante a atualização de fornecedor';
        msg = 'Por favor, entre em contato com nossa equipe para resolvermos o problema o mais breve possível.';
        this.utilService.errorMsg(msg, title, () => { });
      }

      if (err.status === HttpStatus.CONFLICT) {
        this.utilService.alertMsg('Foi encontrado um cadastro no sistema com o mesmo CPF/CNPJ.', () => { });
      }
    });
  }
}
