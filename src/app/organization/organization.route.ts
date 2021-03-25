import { Routes } from '@angular/router';
import { DetailOrganizationComponent } from './detail-organization.component';
import { UpdateOrganizationComponent } from './update-organization.component';

export const organizationRoutes: Routes = [
  {
    path: '',
    component: DetailOrganizationComponent,
    data: {
      title: 'Mi Organización'
    },
  },
  {
    path: ':id/edit',
    component: UpdateOrganizationComponent,
    data: {
      title: 'Editar mi Organización'
    },
  },
];