import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICustomer } from '../models/customer.models';
import { CustomerService } from './customer.service';

@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html'
})
export class DetailCustomerComponent implements OnInit {
  customer!: ICustomer;

  constructor(
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get("id");
    if (id) {
      this.customerService.find(parseInt(id)).subscribe(
        (res: HttpResponse<ICustomer>) =>  this.customer = res.body!
      );
    }
  }

  previousState(): void {
    window.history.back();
  }
}
