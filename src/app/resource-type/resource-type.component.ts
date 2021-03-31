import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TableComponent } from '../component/table/table.component';
import { InputTypeEnum, ITable } from '../component/table/table.models';
import { IResourceType } from '../models/resourceType.models';
import { DeleteResourceTypeModalComponent } from './delete-resource-type-modal.component';
import { ResourceTypeService } from './resource-type.service';

@Component({
  selector: 'app-resource-type',
  templateUrl: './resource-type.component.html'
})
export class ResourceTypeComponent implements OnInit {
  @ViewChild('tableComponent') tableComponent!: TableComponent;  
  private ngbModalRef: NgbModalRef | undefined;

  table!: ITable;
  sort: string[] = ['ASC', 'description'];
  myForm = this.fb.group({
    description: [null],
    active: [null],
  });


  constructor(
    private resourceTypeService: ResourceTypeService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router
  ) {}

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
          permissions: ['resourcesTypes.read'],
          title: 'Ver',
          onClickFunction: (resourceType: IResourceType) => this.router.navigate(['resources-types', resourceType.id, 'view'])
        },
        {
          class: 'btn btn-primary btn-icon mr-1',
          icon: ['fas', 'pencil-alt'],
          permissions: ['resourcesTypes.write'],
          title: 'Editar',
          onClickFunction: (resourceType: IResourceType) => this.router.navigate(['resources-types', resourceType.id, 'edit'])
        },
        {
          class: 'btn btn-danger btn-icon mr-1',
          icon: ['fas', 'times'],
          permissions: ['resourcesTypes.delete'],
          title: 'Eliminar',
          onClickFunction: (resourceType: IResourceType) => this.delete(resourceType)
        }
      ]
    }
  }

  query = (req?: any) => this.resourceTypeService.findAllByFilter(req);

  delete(resourceType: IResourceType): void {
    this.ngbModalRef = this.modalService.open(DeleteResourceTypeModalComponent, { size: 'lg', backdrop: 'static' });
    this.ngbModalRef.componentInstance.resourceType = resourceType;
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
