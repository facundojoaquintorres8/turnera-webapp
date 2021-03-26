import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fontAwesomeIcons } from './font-awesome-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PermissionModule } from '../security/permission.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, PermissionModule],
  exports: [
    FormsModule,
    CommonModule,
    NgbModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    PermissionModule,
  ]
})
export class SharedModule {
  constructor(iconLibrary: FaIconLibrary) {
    iconLibrary.addIcons(...fontAwesomeIcons);
  }
}
