import { CatererService } from './../../../services/registers/caterer.service';
import { Router } from '@angular/router';
import { UtilService } from './../../../util/util.service';
import { Component, OnInit, Inject } from '@angular/core';
import { HttpStatus } from 'src/app/models/enum/http-status.enum';

@Component({
  selector: 'caterer-register',
  templateUrl: './caterer-register.component.html',
  styleUrls: ['./caterer-register.component.scss']
})
export class CatererRegisterComponent implements OnInit {
  public caterers: any = [];
  public caterersPagination: any = [];
  public page = 1;
  public itemsPerPage = 7;
  public maxLinkPage = 9;

  private title;
  private msg;

  constructor(private router: Router,
    @Inject(UtilService) private utilService: UtilService,
    @Inject(CatererService) private catererService: CatererService) { }

  ngOnInit() {
    this.getCaterers();
  }

  private getCaterers() {
    this.catererService.getByClinicID(this.utilService.getUser().clinicID).subscribe((b: any) => {
      this.caterers = b;
      this.caterersPagination = this.utilService.paginate(this.caterers, this.itemsPerPage, this.page);
    }, err => {
      if (err.status === HttpStatus.BAD_REQUEST || err.status === HttpStatus.NOT_FOUND || err.status === HttpStatus.INTERNAL_SERVER_ERROR) {
        this.title = 'Ocorreu um erro durante a busca de fornecedores :(';
        this.msg = 'Por favor, entre em contato com nossa equipe para resolvermos o problema o mais breve possível.';
        this.utilService.errorMsg(this.msg, this.title, () => { });
        console.log(err);
      }
    });
  }

  public edit(caterer) {

  }

  public delete(caterer) {
    let title;
    let msg;

    this.utilService.confirmMsg('Deseja realmente excluir o registro selecionado?', 'Excluir Fornecedor', (result) => {
      if (result.value) {
        const index = this.caterers.indexOf(caterer);
        if (index > -1) {
          if (caterer.id) {
            this.catererService.delete(caterer.id).subscribe(() => {
              this.utilService.showNotification('far fa-check-circle', 'Removido com sucesso!', 'success');
            }, err => {
              if (err.status === HttpStatus.BAD_REQUEST || err.status === HttpStatus.NOT_FOUND
                || err.status === HttpStatus.INTERNAL_SERVER_ERROR) {
                title = 'Ocorreu um erro durante a exclusão do fornecedor :(';
                msg = 'Por favor, entre em contato com nossa equipe para resolvermos o problema o mais breve possível.';
                this.utilService.errorMsg(msg, title, () => { });
                console.log(err);
              }
            });
          }
          this.caterers.splice(index, 1);
          this.caterersPagination = this.utilService.paginate(this.caterers, this.itemsPerPage, this.page);
        }
      }
    });
  }

  public goTo(route: string) {
    this.utilService.goTo(this.router, route);
  }
}
