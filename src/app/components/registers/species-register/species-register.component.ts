import { Component, OnInit, Inject } from '@angular/core';
import { UtilService } from 'src/app/util/util.service';
import { Observable } from 'rxjs';
import { NewSpeciesComponent } from '../modal/new-species/new-species.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SpecieService } from 'src/app/services/registers/species.service';
import { HttpStatus } from 'src/app/models/enum/http-status.enum';

@Component({
  selector: 'species-register',
  templateUrl: './species-register.component.html',
  styleUrls: ['./species-register.component.scss']
})
export class SpeciesRegisterComponent implements OnInit {

  public modalRef: BsModalRef;
  public species: any = [];

  constructor(private modalService: BsModalService,
              @Inject(UtilService) private utilService: UtilService,
              @Inject(SpecieService) private specieService: SpecieService) { }

  ngOnInit() {
    this.getSpecies();
  }

  private getSpecies() {
    let title;
    let msg;

    this.specieService.get().subscribe((s: any) => {
      this.species = s;
    }, err => {
      if (err.status === HttpStatus.BAD_REQUEST || err.status === HttpStatus.NOT_FOUND || err.status === HttpStatus.INTERNAL_SERVER_ERROR) {
        title = 'Ocorreu um erro durante a busca de espécies :(';
        msg = 'Por favor, entre em contato com nossa equipe para resolvermos o problema o mais breve possível.';
        this.utilService.errorMsg(msg, title, () => { });
        console.log(err);
      }
    });
  }

  public edit(specie) {
    this.openModal(specie);
  }

  public delete(specie) {
    this.utilService.confirmMsg('Deseja realmente excluir o registro selecionado?', 'Excluir Espécie', (result) => {
      if (result.value) {
        const index = this.species.indexOf(specie);
        if (index > -1) {
          this.species.splice(index, 1);
        }
      }
    });
  }

  public openModal(specie) {
    this.configurationModal(specie).subscribe((res: any) => {
      const found = this.species.find(element => element.name === res.name);

      if (!specie) {
        if (found === undefined && specie === undefined) {
          this.species.push(res);
          this.utilService.showNotification('fas fa-thumbs-up', 'Espécie cadastrada com sucesso!', 'success');
        } else {
          this.utilService.showNotification('fas fa-exclamation-triangle', 'Essa espécie já existe.', 'warning');
        }
      } else {
        this.species.splice(this.species.findIndex(element => {
          return element.contactType === specie.contactType && element.number === specie.number;
        }), 1, res);
        this.utilService.showNotification('fas fa-thumbs-up', 'Edição realizada com sucesso!', 'success');
      }
    });
  }

  configurationModal(specie):
    Observable<string> {
    const title = specie === undefined ? 'Nova Espécie' : 'Editar Espécie';

    const initialState = {
      title: title,
      specie: specie
    };
    this.modalRef = this.modalService.show(NewSpeciesComponent, { initialState, class: 'modal-lg', ignoreBackdropClick: true });
    this.modalRef.content.closeBtnName = 'Cancelar';

    return new Observable<string>(this.utilService.getConfirmSubscriber(this.modalRef, this.modalService));
  }
}
