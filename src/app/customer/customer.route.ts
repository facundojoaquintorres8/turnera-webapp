import { Routes } from '@angular/router';
import { DetailCustomerComponent } from './detail-customer.component';
import { UpdateCustomerComponent } from './update-customer.component';
import { CustomerComponent } from './customer.component';
import { AuthGuard } from '../security/auth-guard';

export const customerRoutes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    data: {
      title: 'Clientes',
      permissions: ['customers.read']
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'new',
    component: UpdateCustomerComponent,
    data: {
      title: 'Crear Cliente',
      permissions: ['customers.write']
    },
    canActivate: [AuthGuard]
  },
  {
    path: ':id/edit',
    component: UpdateCustomerComponent,
    data: {
      title: 'Actualizar Cliente',
      permissions: ['customers.write']
    },
    canActivate: [AuthGuard]
  },
  {
    path: ':id/view',
    component: DetailCustomerComponent,
    data: {
      title: 'Detalle de Cliente',
      permissions: ['customers.read']
    },
    canActivate: [AuthGuard]
  }
];