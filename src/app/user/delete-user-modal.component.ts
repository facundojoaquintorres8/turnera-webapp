import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IUser } from '../models/user.models';
import { UserService } from './user.service';

@Component({
  templateUrl: './delete-user-modal.component.html'
})
export class DeleteUserModalComponent {
  user!: IUser;

  constructor(private userService: UserService, private activeModal: NgbActiveModal) { }

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.userService.delete(id).subscribe(
      () => this.activeModal.close()
    );
  }
}

