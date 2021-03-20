import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IAgenda } from '../models/agenda.models';
import { AgendaService } from './agenda.service';

@Component({
  templateUrl: './desactivate-agenda-modal.component.html'
})
export class DesactivateAgendaModalComponent {
  agenda!: IAgenda;

  constructor(private agendaService: AgendaService, private activeModal: NgbActiveModal) { }

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDesactivate(id: number): void {
    this.agendaService.desactivate(id).subscribe(
      () => this.activeModal.close()
    );
  }
}

