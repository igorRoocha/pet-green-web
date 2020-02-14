import { BreedService } from './../../../services/registers/breed.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit, Inject } from '@angular/core';
import { UtilService } from 'src/app/util/util.service';
import { Observable } from 'rxjs';
import { NewBreedComponent } from '../modal/new-breed/new-breed.component';
import { HttpStatus } from 'src/app/models/enum/http-status.enum';

@Component({
  selector: 'breed-register',
  templateUrl: './breed-register.component.html',
  styleUrls: ['./breed-register.component.scss']
})
export class BreedRegisterComponent implements OnInit {
  public modalRef: BsModalRef;
  public breeds: any = [];

  private title;
  private msg;

  constructor(private modalService: BsModalService,
    @Inject(UtilService) private utilService: UtilService,
    @Inject(BreedService) private breedService: BreedService) { }

  ngOnInit() {
    this.getBreeds();
  }

  private getBreeds() {
    this.breedService.get().subscribe((b: any) => {
      this.breeds = b;
    }, err => {
      if (err.status === HttpStatus.BAD_REQUEST || err.status === HttpStatus.NOT_FOUND || err.status === HttpStatus.INTERNAL_SERVER_ERROR) {
        this.title = 'Ocorreu um erro durante a busca de raças :(';
        this.msg = 'Por favor, entre em contato com nossa equipe para resolvermos o problema o mais breve possível.';
        this.utilService.errorMsg(this.msg, this.title, () => { });
        console.log(err);
      }
    });
  }

  public edit(breed) {
    this.openModal(breed);
  }

  public delete(breed) {
    let title;
    let msg;

    this.utilService.confirmMsg('Deseja realmente excluir o registro selecionado?', 'Excluir Raça', (result) => {
      if (result.value) {
        const index = this.breeds.indexOf(breed);
        if (index > -1) {
          if (breed.id) {
            this.breedService.delete(breed.id).subscribe(() => {
              this.utilService.showNotification('far fa-check-circle', 'Removido com sucesso!', 'success');
            }, err => {
              if (err.status === HttpStatus.BAD_REQUEST || err.status === HttpStatus.NOT_FOUND
                || err.status === HttpStatus.INTERNAL_SERVER_ERROR) {
                title = 'Ocorreu um erro durante a exclusão da raça :(';
                msg = 'Por favor, entre em contato com nossa equipe para resolvermos o problema o mais breve possível.';
                this.utilService.errorMsg(msg, title, () => { });
                console.log(err);
              }
            });
          }
          this.breeds.splice(index, 1);
        }
      }
    });
  }

  public openModal(breed) {
    this.configurationModal(breed).subscribe((res: any) => {
      const found = this.breeds.find(element => element.name === res.name);

      if (!breed) {
        if (found === undefined && breed === undefined) {
          this.breeds.push(res);
          this.getBreeds();
          this.utilService.showNotification('fas fa-thumbs-up', 'Raça cadastrada com sucesso!', 'success');
        } else {
          this.utilService.showNotification('fas fa-exclamation-triangle', 'Essa raça já existe.', 'warning');
        }
      } else {
        this.breeds.splice(this.breeds.findIndex(element => {
          return element.name === breed.name;
        }), 1, res);
        this.getBreeds();
        this.utilService.showNotification('fas fa-thumbs-up', 'Edição realizada com sucesso!', 'success');
      }
    });
  }

  configurationModal(breed):
    Observable<string> {
    const title = breed === undefined ? 'Nova Raça' : 'Editar Raça';

    const initialState = {
      title: title,
      breed: breed
    };
    this.modalRef = this.modalService.show(NewBreedComponent, { initialState, class: 'modal-lg', ignoreBackdropClick: true });
    this.modalRef.content.closeBtnName = 'Cancelar';

    return new Observable<string>(this.utilService.getConfirmSubscriber(this.modalRef, this.modalService));
  }

}
