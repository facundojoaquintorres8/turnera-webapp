import { Routes } from '@angular/router';
import { PasswordChangeComponent } from '../account/password-change/password-change.component';
import { DetailUserComponent } from './detail-user.component';
import { UpdateUserComponent } from './update-user.component';
import { UserComponent } from './user.component';

export const userRoutes: Routes = [
  {
    path: '',
    component: UserComponent,
    data: {
      title: 'Usuarios'
    },
  },
  {
    path: 'new',
    component: UpdateUserComponent,
    data: {
      title: 'Crear Usuario'
    },
  },
  {
    path: ':id/edit',
    component: UpdateUserComponent,
    data: {
      title: 'Actualizar Usuario'
    },
  },
  {
    path: ':id/view',
    component: DetailUserComponent,
    data: {
      title: 'Detalle de Usuario'
    },
  },
  {
    path: 'password-change',
    component: PasswordChangeComponent,
    data: {
      title: 'Cambiar Contraseña'
    },
  }
];