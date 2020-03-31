import { Component, OnInit, Inject } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UtilService } from 'src/app/util/util.service';
import { Observable } from 'rxjs/internal/Observable';
import { NewCoatComponent } from '../modal/new-coat/new-coat.component';

@Component({
  selector: 'coat-register',
  templateUrl: './coat-register.component.html',
  styleUrls: ['./coat-register.component.scss']
})
export class CoatRegisterComponent implements OnInit {
  public modalRef: BsModalRef;
  public coats: any = [];
  public coatsPagination: any = [];
  public page = 1;
  public itemsPerPage = 7;
  public maxLinkPage = 9;

  constructor(private modalService: BsModalService,
    @Inject(UtilService) private utilService: UtilService) { }

  ngOnInit() {
  }

  public openModal(coat) {
    this.configurationModal(coat).subscribe((res: any) => {
      const found = this.coats.find(element => element.name === res.name);

      if (!coat) {
        if (found === undefined && coat === undefined) {
          this.coats.push(res);
          //this.getCoats();
          this.utilService.showNotification('fas fa-thumbs-up', 'Raça cadastrada com sucesso!', 'success');
        } else {
          this.utilService.showNotification('fas fa-exclamation-triangle', 'Essa raça já existe.', 'warning');
        }
      } else {
        this.coats.splice(this.coats.findIndex(element => {
          return element.name === coat.name;
        }), 1, res);
        //this.getCoats();
        this.utilService.showNotification('fas fa-thumbs-up', 'Raça realizada com sucesso!', 'success');
      }
      this.coatsPagination = this.coats;
    });
  }

  configurationModal(coat):
  Observable<string> {
  const title = coat === undefined ? 'Nova Pelagem' : 'Editar Pelagem';

  const initialState = {
    title: title,
    coat: coat
  };
  this.modalRef = this.modalService.show(NewCoatComponent, { initialState, class: 'modal-lg', ignoreBackdropClick: true });
  this.modalRef.content.closeBtnName = 'Cancelar';

  return new Observable<string>(this.utilService.getConfirmSubscriber(this.modalRef, this.modalService));
}
}
