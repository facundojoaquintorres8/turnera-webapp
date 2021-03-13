import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IResourceType } from '../models/resourceType.models';
import { ResourceTypeService } from './resource-type.service';

@Component({
  templateUrl: './delete-resource-type-modal.component.html'
})
export class DeleteResourceTypeModalComponent {
  resourceType!: IResourceType;

  constructor(private resourceTypeService: ResourceTypeService, private activeModal: NgbActiveModal) { }

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.resourceTypeService.delete(id).subscribe(
      () => this.activeModal.close()
    );
  }
}

