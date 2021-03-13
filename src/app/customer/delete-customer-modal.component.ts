import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ICustomer } from '../models/customer.models';
import { CustomerService } from './customer.service';

@Component({
  templateUrl: './delete-customer-modal.component.html'
})
export class DeleteCustomerModalComponent {
  customer!: ICustomer;

  constructor(private customerService: CustomerService, private activeModal: NgbActiveModal) { }

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.customerService.delete(id).subscribe(
      () => this.activeModal.close()
    );
  }
}

