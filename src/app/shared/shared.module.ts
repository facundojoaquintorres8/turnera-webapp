import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fontAwesomeIcons } from './font-awesome-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PermissionModule } from '../security/permission.module';
import { TableComponent } from '../component/table/table.component';
import { PaginateComponent } from '../component/table/paginate.component';
import { TableHeaderComponent } from '../component/table/table-header.component';
import { TableBodyComponent } from '../component/table/table-body.component';

@NgModule({
  declarations: [TableComponent, TableHeaderComponent, TableBodyComponent, PaginateComponent],
  imports: [CommonModule, PermissionModule, FontAwesomeModule, ReactiveFormsModule],
  exports: [
    FormsModule,
    CommonModule,
    NgbModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    PermissionModule,
    TableComponent,
    TableHeaderComponent,
    TableBodyComponent,
    PaginateComponent,
  ]
})
export class SharedModule {
  constructor(iconLibrary: FaIconLibrary) {
    iconLibrary.addIcons(...fontAwesomeIcons);
  }
}
