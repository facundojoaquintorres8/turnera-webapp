import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IResource } from '../models/resource.models';
import { ResourceService } from './resource.service';

@Component({
  templateUrl: './delete-resource-modal.component.html'
})
export class DeleteResourceModalComponent {
  resource!: IResource;

  constructor(private resourceService: ResourceService, private activeModal: NgbActiveModal) { }

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.resourceService.delete(id).subscribe(
      () => this.activeModal.close()
    );
  }
}

