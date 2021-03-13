import { Routes } from '@angular/router';
import { DetailCustomerComponent } from './detail-customer.component';
import { UpdateCustomerComponent } from './update-customer.component';
import { CustomerComponent } from './customer.component';

export const customerRoutes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    data: {
      title: 'Clientes'
    },
  },
  {
    path: 'new',
    component: UpdateCustomerComponent,
    data: {
      title: 'Crear Cliente'
    },
  },
  {
    path: ':id/edit',
    component: UpdateCustomerComponent,
    data: {
      title: 'Actualizar Cliente'
    },
  },
  {
    path: ':id/view',
    component: DetailCustomerComponent,
    data: {
      title: 'Detalle de Cliente'
    },
  }
];