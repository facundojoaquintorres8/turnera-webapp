import { Routes } from '@angular/router';
import { DetailResourceComponent } from './detail-resource.component';
import { UpdateResourceComponent } from './update-resource.component';
import { ResourceComponent } from './resource.component';
import { AuthGuard } from '../security/auth-guard';

export const resourceRoutes: Routes = [
  {
    path: '',
    component: ResourceComponent,
    data: {
      title: 'Recursos',
      permissions: ['resources.read']
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'new',
    component: UpdateResourceComponent,
    data: {
      title: 'Crear Recurso',
      permissions: ['resources.write']
    },
    canActivate: [AuthGuard]
  },
  {
    path: ':id/edit',
    component: UpdateResourceComponent,
    data: {
      title: 'Actualizar Recurso',
      permissions: ['resources.write']
    },
    canActivate: [AuthGuard]
  },
  {
    path: ':id/view',
    component: DetailResourceComponent,
    data: {
      title: 'Detalle de Recurso',
      permissions: ['resources.read']
    },
    canActivate: [AuthGuard]
  }
];