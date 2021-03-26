import { Routes } from '@angular/router';
import { DetailProfileComponent } from './detail-profile.component';
import { UpdateProfileComponent } from './update-profile.component';
import { ProfileComponent } from './profile.component';
import { AuthGuard } from '../security/auth-guard';

export const profileRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    data: {
      title: 'Perfiles',
      permissions: ['profiles.read']
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'new',
    component: UpdateProfileComponent,
    data: {
      title: 'Crear Perfil',
      permissions: ['profiles.write']
    },
    canActivate: [AuthGuard]
  },
  {
    path: ':id/edit',
    component: UpdateProfileComponent,
    data: {
      title: 'Actualizar Perfil',
      permissions: ['profiles.write']
    },
    canActivate: [AuthGuard]
  },
  {
    path: ':id/view',
    component: DetailProfileComponent,
    data: {
      title: 'Detalle de Perfil',
      permissions: ['profiles.read']
    },
    canActivate: [AuthGuard]
  }
];