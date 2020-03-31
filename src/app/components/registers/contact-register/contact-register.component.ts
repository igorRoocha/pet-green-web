import { Contact } from './../../../models/contact';
import { UtilService } from 'src/app/util/util.service';
import { Component, OnInit, TemplateRef, ViewChild, Inject, Input, OnChanges } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NewContactComponent } from '../modal/new-contact/new-contact.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'contact-register',
  templateUrl: './contact-register.component.html',
  styleUrls: ['./contact-register.component.scss']
})
export class ContactRegisterComponent implements OnChanges {

  public modalRef: BsModalRef;
  public contacts: any[] = [];
  @Input('contacts') inputContacts: any;

  @ViewChild(NewContactComponent) newContactComponent: NewContactComponent;

  constructor(private modalService: BsModalService,
    @Inject(UtilService) private utilService: UtilService) { }

  ngOnChanges() {
    if (this.inputContacts) {
      this.contacts = this.inputContacts;
    }
  }

  public edit(contact) {
    this.openModal(contact);
  }

  public delete(contact) {
    this.utilService.confirmMsg('Deseja realmente excluir o registro selecionado?', 'Excluir Contato', (result) => {
      if (result.value) {
        const index = this.contacts.indexOf(contact);
        if (index > -1) {
          this.contacts.splice(index, 1);
        }
      }
    });
  }

  openModal(contact) {
    this.configurationModal(contact).subscribe((res: any) => {
      const found = this.contacts.find(element => element.number === res.number &&
        element.contactType === res.contactType);

      if (!contact) {
        if (found === undefined && contact === undefined) {
          this.contacts.push(res);
          this.utilService.showNotification('fas fa-thumbs-up', 'Contato cadastrado com sucesso!', 'success');
        } else {
          this.utilService.showNotification('fas fa-exclamation-triangle', 'Este contato já existe.', 'warning');
        }
      } else {
        this.contacts.splice(this.contacts.findIndex(element => {
          return element.contactType === contact.contactType && element.number === contact.number;
        }), 1, res);
        this.utilService.showNotification('fas fa-thumbs-up', 'Edição realizada com sucesso!', 'success');
      }
    });
  }

  configurationModal(contact):
    Observable<string> {
    const initialState = {
      title: 'Novo Contato',
      contact: contact
    };

    this.modalRef = this.modalService.show(NewContactComponent, { initialState, class: 'modal-lg', ignoreBackdropClick: true });
    this.modalRef.content.closeBtnName = 'Cancelar';

    return new Observable<string>(this.getConfirmSubscriber());
  }

  private getConfirmSubscriber() {
    return (observer) => {
      const subscription = this.modalService.onHidden.subscribe(() => {
        if (this.modalRef.content.answer !== undefined && this.modalRef.content.answer !== null) {
          observer.next(this.modalRef.content.answer);
        }
        observer.complete();
      });

      return {
        unsubscribe() {
          subscription.unsubscribe();
        }
      };
    };
  }
}
