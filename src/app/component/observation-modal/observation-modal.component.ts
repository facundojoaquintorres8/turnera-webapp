import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: './observation-modal.component.html'
})
export class ObservationModalComponent {
  observations!: string;

  constructor(private activeModal: NgbActiveModal) { }

  cancel(): void {
    this.activeModal.dismiss();
  }
}

