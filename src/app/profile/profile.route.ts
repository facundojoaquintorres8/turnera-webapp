import { Routes } from '@angular/router';
import { DetailProfileComponent } from './detail-profile.component';
import { UpdateProfileComponent } from './update-profile.component';
import { ProfileComponent } from './profile.component';

export const profileRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    data: {
      title: 'Perfiles'
    },
  },
  {
    path: 'new',
    component: UpdateProfileComponent,
    data: {
      title: 'Crear Perfil'
    },
  },
  {
    path: ':id/edit',
    component: UpdateProfileComponent,
    data: {
      title: 'Actualizar Perfil'
    },
  },
  {
    path: ':id/view',
    component: DetailProfileComponent,
    data: {
      title: 'Detalle de Perfil'
    },
  }
];