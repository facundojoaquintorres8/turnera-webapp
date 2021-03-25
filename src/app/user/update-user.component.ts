import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.models';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { IProfile } from '../models/profile.models';
import { ProfileService } from '../profile/profile.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html'
})
export class UpdateUserComponent implements OnInit {
  isSaving = false;

  profiles: IProfile[] = [];

  myForm = this.fb.group({
    id: [],
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email, Validators.maxLength(100)]],
    active: [null],
    selectAll: [null]
  });

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private profileService: ProfileService,
  ) { }

  ngOnInit(): void {
    this.profileService.findAllByFilter({ active: true }).subscribe(
      (res1: HttpResponse<IProfile[]>) => {
        this.profiles = res1.body || [];
        const id = this.activatedRoute.snapshot.paramMap.get("id");
        if (id) {
          this.userService.find(parseInt(id)).subscribe(
            (res2: HttpResponse<IUser>) => {
              this.updateForm(res2.body!, this.profiles);
            }
          );
        }
      }
    )
  }

  updateForm(user: IUser, allProfiles: IProfile[]): void {
    const profilesIds = user.profiles.map(x => x.id);
    allProfiles.forEach(p => {
      p['selected'] = profilesIds.find(x => x === p.id) !== undefined;
    });
    this.myForm.patchValue({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.username,
      active: user.active,
      selectAll: profilesIds.length === allProfiles.length,
    });
  }

  selectAll(): void {
    if (this.myForm.get(['selectAll'])!.value) {
      this.profiles.forEach(p => {
        p['selected'] = true;
      });
    } else {
      this.profiles.forEach(p => {
        p['selected'] = false;
      });
    }
  }

  selectProfile(profile: IProfile): void {
    profile['selected'] = !profile['selected'];
    this.myForm.patchValue({
      selectAll: !this.profiles.find(x => !x['selected'])
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const user = this.createFromForm();
    if (user.id) {
      this.subscribeToSaveResponse(this.userService.update(user));
    } else {
      this.subscribeToSaveResponse(this.userService.create(user));
    }
  }

  private createFromForm(): IUser {
    return {
      id: this.myForm.get(['id'])!.value,
      organizationId: this.authService.getOrganizationId()!,
      active: this.myForm.get(['active'])!.value,
      firstName: this.myForm.get(['firstName'])!.value,
      lastName: this.myForm.get(['lastName'])!.value,
      username: this.myForm.get(['email'])!.value,
      profiles: this.profiles.filter(x => x['selected'])
    };
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<IUser>>): void {
    result.subscribe(
      () => this.previousState(),
      () => this.isSaving = false
    );
  }
}
