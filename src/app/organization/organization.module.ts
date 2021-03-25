import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DetailOrganizationComponent } from './detail-organization.component';
import { organizationRoutes } from './organization.route';
import { UpdateOrganizationComponent } from './update-organization.component';

@NgModule({
  declarations: [DetailOrganizationComponent, UpdateOrganizationComponent],
  imports: [SharedModule, RouterModule.forChild(organizationRoutes)],
})
export class OrganizationModule { }
