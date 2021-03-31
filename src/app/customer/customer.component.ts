import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DeleteCustomerModalComponent } from './delete-customer-modal.component';
import { CustomerService } from './customer.service';
import { ICustomer } from '../models/customer.models';
import { FormBuilder } from '@angular/forms';
import { InputTypeEnum, ITable } from '../component/table/table.models';
import { Router } from '@angular/router';
import { TableComponent } from '../component/table/table.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html'
})
export class CustomerComponent implements OnInit {
  @ViewChild('tableComponent') tableComponent!: TableComponent;  
  private ngbModalRef: NgbModalRef | undefined;

  table!: ITable;
  sort: string[] = ['ASC', 'businessName'];
  myForm = this.fb.group({
    businessName: [null],
    brandName: [null],
    email: [null],
    phone1: [null],
    active: [null],
  });

  constructor(
    private customerService: CustomerService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.table = {
      headers: [
        { label: 'Razón Social', inputType: InputTypeEnum.TEXT, inputName: 'businessName', sort: true },
        { label: 'Marca', inputType: InputTypeEnum.TEXT, inputName: 'brandName', sort: true },
        { label: 'Correo Electrónico', inputType: InputTypeEnum.TEXT, inputName: 'email', sort: true },
        { label: 'Teléfono 1', inputType: InputTypeEnum.TEXT, inputName: 'phone1', sort: true },
        { label: 'Activo', inputType: InputTypeEnum.BOOLEAN, inputName: 'active', sort: false }
      ],
      buttons: [
        {
          class: 'btn btn-info btn-icon mr-1',
          icon: ['fas', 'eye'],
          permissions: ['customers.read'],
          title: 'Ver',
          onClickFunction: (customer: ICustomer) => this.router.navigate(['customers', customer.id, 'view'])
        },
        {
          class: 'btn btn-primary btn-icon mr-1',
          icon: ['fas', 'pencil-alt'],
          permissions: ['customers.write'],
          title: 'Editar',
          onClickFunction: (customer: ICustomer) => this.router.navigate(['customers', customer.id, 'edit'])
        },
        {
          class: 'btn btn-danger btn-icon mr-1',
          icon: ['fas', 'times'],
          permissions: ['customers.delete'],
          title: 'Eliminar',
          onClickFunction: (customer: ICustomer) => this.delete(customer)
        }
      ]
    }
  }

  query = (req?: any) => this.customerService.findAllByFilter(req);

  delete(customer: ICustomer): void {
    this.ngbModalRef = this.modalService.open(DeleteCustomerModalComponent, { size: 'lg', backdrop: 'static' });
    this.ngbModalRef.componentInstance.customer = customer;
    this.ngbModalRef.result.then(
      () => {
        this.tableComponent.executeQuery({ page: 1 });
        this.ngbModalRef = undefined;
      },
      () => {
        this.ngbModalRef = undefined;
      }
    );
  }
}
