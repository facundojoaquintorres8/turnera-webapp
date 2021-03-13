import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IResourceType } from '../models/resourceType.models';
import { DeleteResourceTypeModalComponent } from './delete-resource-type-modal.component';
import { ResourceTypeService } from './resource-type.service';

@Component({
  selector: 'app-resource-type',
  templateUrl: './resource-type.component.html'
})
export class ResourceTypeComponent implements OnInit {
  private ngbModalRef: NgbModalRef | undefined;

  resourcesTypes: IResourceType[] = [];
  constructor(private resourceTypeService: ResourceTypeService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.findAllByOrganizationId();
  }

  findAllByOrganizationId(): void {
    this.resourcesTypes = [];
    this.resourceTypeService.findAllByFilter({}).subscribe(
      (res: HttpResponse<IResourceType[]>) => (this.resourcesTypes = res.body || [])
    );
  }

  delete(resourceType: IResourceType): void {
    this.ngbModalRef = this.modalService.open(DeleteResourceTypeModalComponent, { size: 'lg', backdrop: 'static' });
    this.ngbModalRef.componentInstance.resourceType = resourceType;
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
