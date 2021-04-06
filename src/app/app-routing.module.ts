import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivateLayoutComponent } from './layout/private/private-layout.component';
import { PublicLayoutComponent } from './layout/public/public-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    data: {
      title: 'Turnera'
    },
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'account',
        loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
      }
    ]
  },
  {
    path: '',
    component: PrivateLayoutComponent,
    data: {
      title: 'Turnera'
    },
    children: [
      {
        path: '',
        redirectTo: '/schedule',
        pathMatch: 'full'
      },
      {
        path: 'users',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
      },
      {
        path: 'profiles',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'customers',
        loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)
      },
      {
        path: 'resources-types',
        loadChildren: () => import('./resource-type/resource-type.module').then(m => m.ResourceTypeModule)
      },
      {
        path: 'resources',
        loadChildren: () => import('./resource/resource.module').then(m => m.ResourceModule)
      },
      {
        path: 'schedule',
        loadChildren: () => import('./schedule/schedule.module').then(m => m.ScheduleModule)
      },
      {
        path: 'agendas',
        loadChildren: () => import('./agenda/agenda.module').then(m => m.AgendaModule)
      },
      {
        path: 'appointment-tracking',
        loadChildren: () => import('./appointment-tracking/appointment-tracking.module').then(m => m.AppointmentTrackingModule)
      },
      {
        path: 'organizations',
        loadChildren: () => import('./organization/organization.module').then(m => m.OrganizationModule)
      }
    ]
  },
  { path: '**', redirectTo: '/schedule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
