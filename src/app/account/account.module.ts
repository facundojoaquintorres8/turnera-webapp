import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { accountRoutes } from './account.route';
import { RegisterComponent } from './register/register.component';
import { ActivateComponent } from './activate/activate.component';
import { PasswordResetRequestComponent } from './password-reset-request/password-reset-request.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';

@NgModule({
  declarations: [RegisterComponent, ActivateComponent, PasswordResetRequestComponent, PasswordResetComponent],
  imports: [SharedModule, RouterModule.forChild(accountRoutes)]
})
export class AccountModule { }
