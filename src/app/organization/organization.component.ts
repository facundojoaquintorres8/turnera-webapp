import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IOrganization } from '../models/organization.models';
import { OrganizationService } from './organization.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html'
})
export class OrganizationComponent implements OnInit {
  isSaving = false;

  myForm = this.fb.group({
    id: [],
    businessName: [null, [Validators.required]],
    brandName: [null],
    cuit: [null, [Validators.maxLength(11)]],
    address: [null],
    phone1: [null, [Validators.maxLength(50)]],
    phone2: [null, [Validators.maxLength(50)]],
    defaultEmail: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
  });

  constructor(
    private organizationService: OrganizationService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.organizationService.find().subscribe(
      (res: HttpResponse<IOrganization>) => this.updateForm(res.body!)
    );
  }

  updateForm(organization: IOrganization): void {
    this.myForm.patchValue({
      id: organization.id,
      businessName: organization.businessName,
      brandName: organization.brandName,
      cuit: organization.cuit,
      address: organization.address,
      phone1: organization.phone1,
      phone2: organization.phone2,
      defaultEmail: organization.defaultEmail,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    this.subscribeToSaveResponse(this.organizationService.update(this.createFromForm()));
  }

  private createFromForm(): IOrganization {
    return {
      id: this.myForm.get(['id'])!.value,
      businessName: this.myForm.get(['businessName'])!.value,
      brandName: this.myForm.get(['brandName'])!.value,
      cuit: this.myForm.get(['cuit'])!.value,
      address: this.myForm.get(['address'])!.value,
      phone1: this.myForm.get(['phone1'])!.value,
      phone2: this.myForm.get(['phone2'])!.value,
      defaultEmail: this.myForm.get(['defaultEmail'])!.value,
    };
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<IOrganization>>): void {
    result.subscribe(
      () => this.previousState(),
      () => this.isSaving = false
    );
  }
}
