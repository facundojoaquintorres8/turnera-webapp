import { Routes } from '@angular/router';
import { DetailResourceTypeComponent } from './detail-resource-type.component';
import { UpdateResourceTypeComponent } from './update-resource-type.component';
import { ResourceTypeComponent } from './resource-type.component';

export const resourceTypeRoutes: Routes = [
  {
    path: '',
    component: ResourceTypeComponent,
    data: {
      title: 'Tipos de Recursos'
    },
  },
  {
    path: 'new',
    component: UpdateResourceTypeComponent,
    data: {
      title: 'Crear Tipo de Recurso'
    },
  },
  {
    path: ':id/edit',
    component: UpdateResourceTypeComponent,
    data: {
      title: 'Actualizar Tipo de Recurso'
    },
  },
  {
    path: ':id/view',
    component: DetailResourceTypeComponent,
    data: {
      title: 'Detalle de Tipo de Recurso'
    },
  }
];