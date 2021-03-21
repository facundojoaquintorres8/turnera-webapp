import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileService } from './profile.service';
import { AuthService } from '../auth/auth.service';
import { IPermission, IProfile } from '../models/profile.models';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html'
})
export class UpdateProfileComponent implements OnInit {
  isSaving = false;

  permissions: IPermission[] = [];
  permissionHomeIndex!: IPermission;

  myForm = this.fb.group({
    id: [],
    description: [null, [Validators.required]],
    active: [null],
    selectAll: [null]
  });

  constructor(
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.profileService.findAllPermissions().subscribe(
      (res1: HttpResponse<IPermission[]>) => {
        this.permissions = res1.body || [];
        this.permissionHomeIndex = this.permissions.find(x => x.code === 'home.index')!;
        this.permissionHomeIndex['selected'] = true;
        this.permissionHomeIndex['isPredetermined'] = true;

        const id = this.activatedRoute.snapshot.paramMap.get("id");
        if (id) {
          this.profileService.find(parseInt(id)).subscribe(
            (res2: HttpResponse<IProfile>) => {
              this.updateForm(res2.body!, this.permissions);
            }
          );
        }
      }
    )
  }

  updateForm(profile: IProfile, allPermissions: IPermission[]): void {
    const permissionsId = profile.permissions.map(x => x.id);
    allPermissions.forEach(p => {
      p['selected'] = permissionsId.find(x => x === p.id) !== undefined;
    });
    this.myForm.patchValue({
      id: profile.id,
      description: profile.description,
      active: profile.active,
      selectAll: permissionsId.length === allPermissions.length,
    });
  }

  selectAll(): void {
    if (this.myForm.get(['selectAll'])!.value) {
      this.permissions.forEach(p => {
        p['selected'] = true;
      });
    } else {
      this.permissions.forEach(p => {
        if (!p['isPredetermined']) {
          p['selected'] = false;
        }
      });
    }
  }

  selectPermission(permission: IPermission): void {
    permission['selected'] = !permission['selected'];
    this.myForm.patchValue({
      selectAll: !this.permissions.find(x => !x['selected'])
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const profile = this.createFromForm();
    if (profile.id) {
      this.subscribeToSaveResponse(this.profileService.update(profile));
    } else {
      this.subscribeToSaveResponse(this.profileService.create(profile));
    }
  }

  private createFromForm(): IProfile {
    return {
      id: this.myForm.get(['id'])!.value,
      organizationId: this.authService.getOrganizationId()!,
      active: this.myForm.get(['active'])!.value,
      description: this.myForm.get(['description'])!.value,
      permissions: this.permissions.filter(x => x['selected'])
    };
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<IProfile>>): void {
    result.subscribe(
      () => this.previousState(),
      () => this.isSaving = false
    );
  }
}
