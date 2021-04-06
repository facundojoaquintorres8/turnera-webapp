import { NgModule } from '@angular/core';
import { HasPermissionDirective } from './has-permission.directive';

@NgModule({
  declarations: [HasPermissionDirective],
  exports: [HasPermissionDirective]
})
export class PermissionModule {}
