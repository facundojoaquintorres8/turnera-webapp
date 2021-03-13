import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IAgenda } from '../models/agenda.models';
import { AgendaService } from './agenda.service';

@Component({
  templateUrl: './delete-agenda-modal.component.html'
})
export class DeleteAgendaModalComponent {
  agenda!: IAgenda;

  constructor(private agendaService: AgendaService, private activeModal: NgbActiveModal) { }

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.agendaService.delete(id).subscribe(
      () => this.activeModal.close()
    );
  }
}

