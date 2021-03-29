import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fontAwesomeIcons } from './font-awesome-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PermissionModule } from '../security/permission.module';
import { TableComponent } from '../component/table/table.component';

@NgModule({
  declarations: [TableComponent],
  imports: [CommonModule, PermissionModule, FontAwesomeModule, ReactiveFormsModule],
  exports: [
    FormsModule,
    CommonModule,
    NgbModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    PermissionModule,
    TableComponent,
  ]
})
export class SharedModule {
  constructor(iconLibrary: FaIconLibrary) {
    iconLibrary.addIcons(...fontAwesomeIcons);
  }
}
