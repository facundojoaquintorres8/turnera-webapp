import { Routes } from '@angular/router';
import { CreateAgendaComponent } from './create-agenda.component';

export const agendaRoutes: Routes = [
  {
    path: 'new',
    component: CreateAgendaComponent,
    data: {
      title: 'Crear Disponibilidad'
    },
  },
];