import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IAppointment } from '../models/appointment.model';
import { AppointmentService } from './appointment.service';

@Component({
  templateUrl: './cancel-appointment-modal.component.html'
})
export class CancelAppointmentModalComponent {
  appointment!: IAppointment;

  constructor(private appointmentService: AppointmentService, private activeModal: NgbActiveModal) { }

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirm(id: number): void {
    this.appointmentService.cancel(id).subscribe(
      () => this.activeModal.close()
    );
  }
}

