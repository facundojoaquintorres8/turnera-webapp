import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IResource } from '../models/resource.models';
import { ResourceService } from './resource.service';

@Component({
  selector: 'app-detail-resource',
  templateUrl: './detail-resource.component.html'
})
export class DetailResourceComponent implements OnInit {
  resource!: IResource;

  constructor(
    private resourceService: ResourceService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get("id");
    if (id) {
      this.resourceService.find(parseInt(id)).subscribe(
        (res: HttpResponse<IResource>) =>  this.resource = res.body!
      );
    }
  }

  previousState(): void {
    window.history.back();
  }
}
