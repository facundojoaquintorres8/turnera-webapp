import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IProfile } from '../models/profile.models';
import { ProfileService } from './profile.service';

@Component({
  templateUrl: './delete-profile-modal.component.html'
})
export class DeleteProfileModalComponent {
  profile!: IProfile;

  constructor(private profileService: ProfileService, private activeModal: NgbActiveModal) { }

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.profileService.delete(id).subscribe(
      () => this.activeModal.close()
    );
  }
}

