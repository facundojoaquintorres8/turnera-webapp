import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TableComponent } from '../component/table/table.component';
import { InputTypeEnum, ITable } from '../component/table/table.models';
import { IProfile } from '../models/profile.models';
import { DeleteProfileModalComponent } from './delete-profile-modal.component';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  @ViewChild('tableComponent') tableComponent!: TableComponent;
  private ngbModalRef: NgbModalRef | undefined;

  table!: ITable;
  sort: string[] = ['ASC', 'description'];
  myForm = this.fb.group({
    description: [null],
    active: [null],
  });
  constructor(
    private profileService: ProfileService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.table = {
      headers: [
        { label: 'Descripción', inputType: InputTypeEnum.TEXT, inputName: 'description', sort: true },
        { label: 'Activo', inputType: InputTypeEnum.BOOLEAN, inputName: 'active', sort: false }
      ],
      buttons: [
        {
          class: 'btn btn-info btn-icon mr-1',
          icon: ['fas', 'eye'],
          permissions: ['profiles.read'],
          title: 'Ver',
          onClickFunction: (profile: IProfile) => this.router.navigate(['profiles', profile.id, 'view'])
        },
        {
          class: 'btn btn-primary btn-icon mr-1',
          icon: ['fas', 'pencil-alt'],
          permissions: ['profiles.write'],
          title: 'Editar',
          onClickFunction: (profile: IProfile) => this.router.navigate(['profiles', profile.id, 'edit'])
        },
        {
          class: 'btn btn-danger btn-icon mr-1',
          icon: ['fas', 'times'],
          permissions: ['profiles.delete'],
          title: 'Eliminar',
          onClickFunction: (profile: IProfile) => this.delete(profile)
        }
      ]
    }
  }

  query = (req?: any) => this.profileService.findAllByFilter(req);

  delete(profile: IProfile): void {
    this.ngbModalRef = this.modalService.open(DeleteProfileModalComponent, { size: 'lg', backdrop: 'static' });
    this.ngbModalRef.componentInstance.profile = profile;
    this.ngbModalRef.result.then(
      () => {
        this.tableComponent.executeQuery({ page: 1 });
        this.ngbModalRef = undefined;
      },
      () => {
        this.ngbModalRef = undefined;
      }
    );
  }
}
