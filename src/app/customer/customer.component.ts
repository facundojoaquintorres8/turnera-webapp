import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DeleteCustomerModalComponent } from './delete-customer-modal.component';
import { CustomerService } from './customer.service';
import { ICustomer } from '../models/customer.models';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html'
})
export class CustomerComponent implements OnInit {
  private ngbModalRef: NgbModalRef | undefined;

  customers: ICustomer[] = [];
  constructor(private customerService: CustomerService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.findAllByOrganizationId();
  }

  findAllByOrganizationId(): void {
    this.customers = [];
    this.customerService.findAllByFilter({}).subscribe(
      (res: HttpResponse<ICustomer[]>) => (this.customers = res.body || [])
    );
  }

  delete(customer: ICustomer): void {
    this.ngbModalRef = this.modalService.open(DeleteCustomerModalComponent, { size: 'lg', backdrop: 'static' });
    this.ngbModalRef.componentInstance.customer = customer;
    this.ngbModalRef.result.then(
      () => {
        this.findAllByOrganizationId();
        this.ngbModalRef = undefined;
      },
      () => {
        this.ngbModalRef = undefined;
      }
    );
  }
}
