import { Routes } from '@angular/router';
import { OrganizationComponent } from './organization.component';

export const organizationRoutes: Routes = [
  {
    path: '',
    component: OrganizationComponent,
    data: {
      title: 'Mi Organización'
    },
  },
];