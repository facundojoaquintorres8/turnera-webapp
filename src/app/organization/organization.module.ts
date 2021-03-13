import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { OrganizationComponent } from './organization.component';
import { organizationRoutes } from './organization.route';

@NgModule({
  declarations: [OrganizationComponent],
  imports: [SharedModule, RouterModule.forChild(organizationRoutes)],
})
export class OrganizationModule { }
