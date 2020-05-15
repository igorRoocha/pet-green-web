import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit, Inject } from '@angular/core';
import { UtilService } from 'src/app/util/util.service';
import { Observable } from 'rxjs/internal/Observable';
import { NewProfileComponent } from '../../modal/new-profile/new-profile.component';

@Component({
  selector: 'profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss']
})
export class ProfileListComponent implements OnInit {
  public modalRef: BsModalRef;
  public profiles: any = [];
  public profilesPagination: any = [];
  public page = 1;
  public itemsPerPage = 7;
  public maxLinkPage = 9;

  constructor(private modalService: BsModalService,
    @Inject(UtilService) private utilService: UtilService) { }

  ngOnInit() {
  }

  public edit(profile) {
    this.openModal(profile);
  }

  public openModal(profile) {
    this.configurationModal(profile).subscribe((res: any) => {
      const found = this.profiles.find(element => element.name === res.name);

      if (!profile) {
        if (found === undefined && profile === undefined) {
          this.profiles.push(res);
          //this.getprofiles();
          this.utilService.showNotification('fas fa-thumbs-up', 'Raça cadastrada com sucesso!', 'success');
        } else {
          this.utilService.showNotification('fas fa-exclamation-triangle', 'Essa raça já existe.', 'warning');
        }
      } else {
        this.profiles.splice(this.profiles.findIndex(element => {
          return element.name === profile.name;
        }), 1, res);
        //this.getprofiles();
        this.utilService.showNotification('fas fa-thumbs-up', 'Edição realizada com sucesso!', 'success');
      }

      this.profilesPagination = this.profiles;
    });
  }

  configurationModal(profile):
    Observable<string> {
    const title = profile === undefined ? 'Novo Perfil de Acesso' : 'Editar Perfil de Acesso';

    const initialState = {
      title: title,
      profile: profile
    };
    this.modalRef = this.modalService.show(NewProfileComponent, { initialState, class: 'modal-lg', ignoreBackdropClick: true });
    this.modalRef.content.closeBtnName = 'Cancelar';

    return new Observable<string>(this.utilService.getConfirmSubscriber(this.modalRef, this.modalService));
  }

  public paginate(event) {
    this.page = event.page;
    this.profilesPagination = this.profiles;
    this.profilesPagination = this.utilService.paginate(this.profiles, this.itemsPerPage, event.page);
  }
}
