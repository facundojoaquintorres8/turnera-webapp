import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IProfile } from '../models/profile.models';
import { DeleteProfileModalComponent } from './delete-profile-modal.component';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  private ngbModalRef: NgbModalRef | undefined;

  profiles: IProfile[] = [];
  constructor(private profileService: ProfileService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.findAllByOrganizationId();
  }

  findAllByOrganizationId(): void {
    this.profiles = [];
    this.profileService.findAllByFilter({}).subscribe(
      (res: HttpResponse<IProfile[]>) => (this.profiles = res.body || [])
    );
  }

  delete(profile: IProfile): void {
    this.ngbModalRef = this.modalService.open(DeleteProfileModalComponent, { size: 'lg', backdrop: 'static' });
    this.ngbModalRef.componentInstance.profile = profile;
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
