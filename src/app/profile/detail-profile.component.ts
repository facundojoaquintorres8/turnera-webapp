import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProfile } from '../models/profile.models';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-detail-profile',
  templateUrl: './detail-profile.component.html'
})
export class DetailProfileComponent implements OnInit {
  profile!: IProfile;

  constructor(
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get("id");
    if (id) {
      this.profileService.find(parseInt(id)).subscribe(
        (res: HttpResponse<IProfile>) =>  this.profile = res.body!
      );
    }
  }

  previousState(): void {
    window.history.back();
  }
}
