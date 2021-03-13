import { Routes } from '@angular/router';
import { DetailResourceComponent } from './detail-resource.component';
import { UpdateResourceComponent } from './update-resource.component';
import { ResourceComponent } from './resource.component';

export const resourceRoutes: Routes = [
  {
    path: '',
    component: ResourceComponent,
    data: {
      title: 'Recursos'
    },
  },
  {
    path: 'new',
    component: UpdateResourceComponent,
    data: {
      title: 'Crear Recurso'
    },
  },
  {
    path: ':id/edit',
    component: UpdateResourceComponent,
    data: {
      title: 'Actualizar Recurso'
    },
  },
  {
    path: ':id/view',
    component: DetailResourceComponent,
    data: {
      title: 'Detalle de Recurso'
    },
  }
];