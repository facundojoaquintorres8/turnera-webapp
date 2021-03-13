import { Routes } from '@angular/router';
import { ActivateComponent } from './activate/activate.component';
import { PasswordResetRequestComponent } from './password-reset-request/password-reset-request.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { RegisterComponent } from './register/register.component';

export const accountRoutes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Registrar Organización'
    },
  },
  {
    path: ':activationKey/activate',
    component: ActivateComponent,
    data: {
      title: 'Activar Organización'
    },
  },
  {
    path: 'password-reset/request',
    component: PasswordResetRequestComponent,
    data: {
      title: 'Recuperar Contraseña'
    },
  },
  {
    path: ':resetKey/password-reset',
    component: PasswordResetComponent,
    data: {
      title: 'Cambiar Contraseña'
    },
  }
];