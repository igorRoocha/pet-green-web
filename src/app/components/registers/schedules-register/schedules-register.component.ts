import { Component, OnInit, Inject } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { NewScheduleComponent } from '../modal/new-schedule/new-schedule.component';
import { UtilService } from 'src/app/util/util.service';

@Component({
  selector: 'schedules-register',
  templateUrl: './schedules-register.component.html',
  styleUrls: ['./schedules-register.component.scss']
})
export class SchedulesRegisterComponent implements OnInit {
  public schedules: any = [];
  public modalRef: BsModalRef;
  private daysOfWeek = ['Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado', 'Domingo'];

  constructor(private modalService: BsModalService,
    @Inject(UtilService) private utilService: UtilService) { }

  ngOnInit() {
  }

  public edit(schedule) {
    this.openModal(schedule);
  }

  public delete(schedule) {
    this.utilService.confirmMsg('Deseja realmente excluir o registro selecionado?', 'Excluir Horário', (result) => {
      if (result.value) {
        const index = this.schedules.indexOf(schedule);
        if (index > -1) {
          this.schedules.splice(index, 1);
        }
      }
    });
  }

  public openModal(schedule) {
    this.configurationModal(schedule).subscribe((res: any) => {
      // Variável não vem no parâmetro quando está adicionando um novo horário
      if (!schedule) {
        if (!this.validateDays(res)) {
          this.schedules.push(res);
          this.utilService.showNotification('fas fa-thumbs-up', 'Horário de funcionamento cadastrado com sucesso!', 'success');
        } else {
          this.utilService.showNotification('fas fa-exclamation-triangle', 'Não é permitido repetir dias de funcionamento.'
            , 'warning');
        }
      } else {
        const index = this.schedules.findIndex(element => {
          return element.startHour === schedule.startHour &&
            element.endHour === schedule.endHour && element.days === schedule.days;
        });
        // Salvando o item antigo em memória, pois se a edição não ser válida
        // o vetor tem que voltar para o seu estado original.
        const scheduleAux = this.schedules[index];
        this.schedules.splice(index, 1);

        if (!this.validateDays(res)) {
          // Substituindo o elemento antigo pelo elemento novo que foi editado.
          this.schedules.splice(index, 1, res);
          this.utilService.showNotification('fas fa-thumbs-up', 'Edição realizada com sucesso!', 'success');
        } else {
          this.schedules.push(scheduleAux);
          this.utilService.showNotification('fas fa-exclamation-triangle', 'Não é permitido repetir dias de funcionamento.'
            , 'warning');
        }
      }
    });
  }

  private validateDays(resModal) {
    let invalid = false;

    if (this.schedules.length > 0) {
      this.schedules.forEach(sd => {
        this.daysOfWeek.forEach(element => {
          const regex = new RegExp(element, 'g');
          if (resModal.days.match(regex) !== null && sd.days.match(regex) !== null) {
            invalid = true;
          }
        });
      });
    }

    return invalid;
  }

  public configurationModal(schedule):
    Observable<string> {
    const initialState = {
      title: 'Novo Horário de Funcionamento',
      schedule: schedule
    };

    this.modalRef = this.modalService.show(NewScheduleComponent, { initialState, class: 'modal-lg', ignoreBackdropClick: true });
    this.modalRef.content.closeBtnName = 'Fechar';

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
