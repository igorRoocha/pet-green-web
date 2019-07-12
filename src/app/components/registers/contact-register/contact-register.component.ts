import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NewContactComponent } from '../modal/new-contact/new-contact.component';

@Component({
  selector: 'contact-register',
  templateUrl: './contact-register.component.html',
  styleUrls: ['./contact-register.component.scss']
})
export class ContactRegisterComponent implements OnInit {

  public modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  openModalNewContact() {
    const initialState = {
      title: 'Novo Contato',
    };

    this.modalRef = this.modalService.show(NewContactComponent, { initialState, class: 'modal-lg' });
    this.modalRef.content.closeBtnName = 'Cancelar';
  }
}
