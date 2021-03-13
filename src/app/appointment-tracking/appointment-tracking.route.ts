import { Routes } from '@angular/router';
import { AppointmentTrackingComponent } from './appointment-tracking.component';

export const appointmentTrackingRoutes: Routes = [
  {
    path: '',
    component: AppointmentTrackingComponent,
    data: {
      title: 'Seguimiento de Turnos'
    },
  },
];