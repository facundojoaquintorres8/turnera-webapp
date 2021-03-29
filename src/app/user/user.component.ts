import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth/auth.service';
import { TableComponent } from '../component/table/table.component';
import { InputTypeEnum, ITable } from '../component/table/table.models';
import { IUser } from '../models/user.models';
import { DeleteUserModalComponent } from './delete-user-modal.component';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  @ViewChild('tableComponent') tableComponent!: TableComponent;
  private ngbModalRef: NgbModalRef | undefined;

  table!: ITable;
  sort: string[] = ['ASC', 'firstName'];
  myForm = this.fb.group({
    firstName: [null],
    lastName: [null],
    username: [null],
    active: [null],
  });
  sessionUser: IUser = this.authService.getSessionUser()!;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.table = {
      headers: [
        { label: 'Nombre', inputType: InputTypeEnum.TEXT, inputName: 'firstName', sort: true },
        { label: 'Apellido', inputType: InputTypeEnum.TEXT, inputName: 'lastName', sort: true },
        { label: 'Correo Electrónico', inputType: InputTypeEnum.TEXT, inputName: 'username', sort: true },
        { label: 'Activo', inputType: InputTypeEnum.BOOLEAN, inputName: 'active', sort: false }
      ],
      buttons: [
        {
          class: 'btn btn-info btn-icon mr-1',
          icon: ['fas', 'eye'],
          permissions: ['users.read'],
          title: 'Ver',
          onClickFunction: (user: IUser) => this.router.navigate(['users', user.id, 'view'])
        },
        {
          class: 'btn btn-primary btn-icon mr-1',
          icon: ['fas', 'pencil-alt'],
          permissions: ['users.write'],
          title: 'Editar',
          onClickFunction: (user: IUser) => this.router.navigate(['users', user.id, 'edit'])
        },
        {
          class: 'btn btn-danger btn-icon mr-1',
          icon: ['fas', 'times'],
          permissions: ['users.delete'],
          titleWithFunction: (user: IUser) => this.sessionUser.id === user.id ? 'No puede eliminar su propio Usuario': 'Eliminar',
          title: '',
          onClickFunction: (user: IUser) => this.delete(user),
          disabled: (user: IUser) => this.sessionUser.id === user.id
        }
      ]
    }
  }

  query = (req?: any) => this.userService.findAllByFilter(req);

  delete(user: IUser): void {
    this.ngbModalRef = this.modalService.open(DeleteUserModalComponent, { size: 'lg', backdrop: 'static' });
    this.ngbModalRef.componentInstance.user = user;
    this.ngbModalRef.result.then(
      () => {
        this.tableComponent.executeQuery(1);
        this.ngbModalRef = undefined;
      },
      () => {
        this.ngbModalRef = undefined;
      }
    );
  }
}