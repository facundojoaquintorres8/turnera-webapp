import { Routes } from '@angular/router';
import { AuthGuard } from '../security/auth-guard';
import { AppointmentTrackingComponent } from './appointment-tracking.component';

export const appointmentTrackingRoutes: Routes = [
  {
    path: '',
    component: AppointmentTrackingComponent,
    data: {
      title: 'Seguimiento de Turnos',
      permissions: ['agendas.read']
    },
    canActivate: [AuthGuard]
  },
];