import { Routes } from '@angular/router';
import { PasswordChangeComponent } from '../account/password-change/password-change.component';
import { AuthGuard } from '../security/auth-guard';
import { DetailUserComponent } from './detail-user.component';
import { UpdateUserComponent } from './update-user.component';
import { UserComponent } from './user.component';

export const userRoutes: Routes = [
  {
    path: '',
    component: UserComponent,
    data: {
      title: 'Usuarios',
      permissions: ['users.read']
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'new',
    component: UpdateUserComponent,
    data: {
      title: 'Crear Usuario',
      permissions: ['users.write']
    },
    canActivate: [AuthGuard]
  },
  {
    path: ':id/edit',
    component: UpdateUserComponent,
    data: {
      title: 'Actualizar Usuario',
      permissions: ['users.write']
    },
    canActivate: [AuthGuard]
  },
  {
    path: ':id/view',
    component: DetailUserComponent,
    data: {
      title: 'Detalle de Usuario',
      permissions: ['users.read']
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'password-change',
    component: PasswordChangeComponent,
    data: {
      title: 'Cambiar Contraseña'
    },
    canActivate: [AuthGuard]
  }
];