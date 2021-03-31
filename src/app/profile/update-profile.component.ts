import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileService } from './profile.service';
import { AuthService } from '../auth/auth.service';
import { IPermission, IProfile } from '../models/profile.models';

interface PermissionByEntity { name: string, actions: { permission: IPermission, action: string }[], selected: boolean };

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./profile.scss']
})
export class UpdateProfileComponent implements OnInit {
  isSaving = false;

  allPermissions: IPermission[] = [];

  permissionsByEntities: PermissionByEntity[] = [];

  myForm = this.fb.group({
    id: [],
    description: [null, [Validators.required]],
    active: [null],
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
        this.allPermissions = res1.body?.filter(x => x.code !== 'home.index') || [];

        this.allPermissions.forEach(permission => {
          const permissionSplit = permission.code.split('.');
          const permissionExisting = this.permissionsByEntities.find(x => x.name === permissionSplit[0]);
          if (permissionExisting) {
            permissionExisting.actions.push({ permission, action: permissionSplit[1] });
          } else {
            this.permissionsByEntities.push({
              name: permissionSplit[0], actions: [{ permission, action: permissionSplit[1] }], selected: false
            });
          }
        });

        const id = this.activatedRoute.snapshot.paramMap.get("id");
        if (id) {
          this.profileService.find(parseInt(id)).subscribe(
            (res2: HttpResponse<IProfile>) => {
              this.updateForm(res2.body!, this.permissionsByEntities);
            }
          );
        }
      }
    )
  }

  updateForm(profile: IProfile, permissionsByEntities: PermissionByEntity[]): void {
    permissionsByEntities.forEach(pbye => {
      pbye.actions.forEach(action => {
        if (profile.permissions.find(x => x.id === action.permission.id)) {
          this.select(action.permission, pbye);
        }
      });
    });
    this.myForm.patchValue({
      id: profile.id,
      description: profile.description,
      active: profile.active,
    });
  }

  select(permission: IPermission, permissionByEntity: PermissionByEntity): void {
    permission['selected'] = !permission['selected'];
    permissionByEntity.selected = permissionByEntity.actions.every((x: any) => {
      return x.permission['selected'];
    });
  }

  selectAllEntity(permissionByEntity: PermissionByEntity): void {
    permissionByEntity.selected = !permissionByEntity.selected;
    const permissionByEntityExisting = this.permissionsByEntities.find(x => x === permissionByEntity);
    permissionByEntityExisting?.actions.forEach(p => {
      p.permission['selected'] = permissionByEntity.selected;
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
    const permissionsSelected: IPermission[] = [];
    this.permissionsByEntities.forEach(pbye => {
      pbye.actions.forEach(action => {
        if (action.permission['selected']) {
          permissionsSelected.push(action.permission);
        }
      });
    });
    return {
      id: this.myForm.get(['id'])!.value,
      organizationId: this.authService.getOrganizationId()!,
      active: this.myForm.get(['active'])!.value,
      description: this.myForm.get(['description'])!.value,
      permissions: permissionsSelected
    };
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<IProfile>>): void {
    result.subscribe(
      () => this.previousState(),
      () => this.isSaving = false
    );
  }
}
