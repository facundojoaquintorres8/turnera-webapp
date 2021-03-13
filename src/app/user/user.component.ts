import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth/auth.service';
import { IUser } from '../models/user.models';
import { DeleteUserModalComponent } from './delete-user-modal.component';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  private ngbModalRef: NgbModalRef | undefined;

  users: IUser[] = [];
  sessionUser: IUser = this.authService.getSessionUser()!;

  constructor(private userService: UserService, private authService: AuthService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.findAllByOrganizationId();
  }

  findAllByOrganizationId(): void {
    this.users = [];
    this.userService.findAllByFilter({}).subscribe(
      (res: HttpResponse<IUser[]>) => (this.users = res.body || [])
    );
  }

  delete(user: IUser): void {
    this.ngbModalRef = this.modalService.open(DeleteUserModalComponent, { size: 'lg', backdrop: 'static' });
    this.ngbModalRef.componentInstance.user = user;
    this.ngbModalRef.result.then(
      () => {
        this.findAllByOrganizationId();
        this.ngbModalRef = undefined;
      },
      () => {
        this.ngbModalRef = undefined;
      }
    );
  }
}
