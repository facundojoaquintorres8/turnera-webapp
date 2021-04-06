import { Routes } from '@angular/router';
import { AuthGuard } from '../security/auth-guard';
import { ScheduleComponent } from './schedule.component';

export const scheduleRoutes: Routes = [
  {
    path: '',
    component: ScheduleComponent,
    data: {
      title: 'Calendario',
      permissions: ['home.index']
    },
    canActivate: [AuthGuard]
  }
];