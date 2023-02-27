import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IHoliday } from '../models/holiday.models';
import { HolidayService } from './holiday.service';

@Component({
  templateUrl: './delete-holiday-modal.component.html'
})
export class DeleteHolidayModalComponent {
  holiday!: IHoliday;

  constructor(private holidayService: HolidayService, private activeModal: NgbActiveModal) { }

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.holidayService.delete(id).subscribe(
      () => this.activeModal.close()
    );
  }
}

