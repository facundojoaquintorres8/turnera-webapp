import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IResource } from '../models/resource.models';
import { DeleteResourceModalComponent } from './delete-resource-modal.component';
import { ResourceService } from './resource.service';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html'
})
export class ResourceComponent implements OnInit {
  private ngbModalRef: NgbModalRef | undefined;

  resources: IResource[] = [];
  constructor(private resourceService: ResourceService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.findAllByOrganizationId();
  }

  findAllByOrganizationId(): void {
    this.resources = [];
    this.resourceService.findAllByFilter({}).subscribe(
      (res: HttpResponse<IResource[]>) => (this.resources = res.body || [])
    );
  }

  delete(resource: IResource): void {
    this.ngbModalRef = this.modalService.open(DeleteResourceModalComponent, { size: 'lg', backdrop: 'static' });
    this.ngbModalRef.componentInstance.resource = resource;
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
