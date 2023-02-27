import { Routes } from '@angular/router';
import { DetailHolidayComponent } from './detail-holiday.component';
import { UpdateHolidayComponent } from './update-holiday.component';
import { HolidayComponent } from './holiday.component';
import { AuthGuard } from '../security/auth-guard';

export const holidayRoutes: Routes = [
  {
    path: '',
    component: HolidayComponent,
    data: {
      title: 'Feriados',
      permissions: ['holidays.read']
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'new',
    component: UpdateHolidayComponent,
    data: {
      title: 'Crear Feriado',
      permissions: ['holidays.write']
    },
    canActivate: [AuthGuard]
  },
  {
    path: ':id/edit',
    component: UpdateHolidayComponent,
    data: {
      title: 'Actualizar Feriado',
      permissions: ['holidays.write']
    },
    canActivate: [AuthGuard]
  },
  {
    path: ':id/view',
    component: DetailHolidayComponent,
    data: {
      title: 'Detalle de Feriado',
      permissions: ['holidays.read']
    },
    canActivate: [AuthGuard]
  }
];