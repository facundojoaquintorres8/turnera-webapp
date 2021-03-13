import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AgendaService } from './agenda.service';
import { AuthService } from '../auth/auth.service';
import { ISaveAgenda } from '../models/agenda.models';
import { IResource } from '../models/resource.models';
import { ResourceService } from '../resource/resource.service';
import { formatDateFromIDate, formatTimeFromITime } from '../shared/date-format';

@Component({
  selector: 'app-create-agenda',
  templateUrl: './create-agenda.component.html'
})
export class CreateAgendaComponent implements OnInit {
  isSaving = false;

  resources!: IResource[];

  myForm = this.fb.group({
    id: [],
    resource: [null, [Validators.required]],
    startDate: [null, [Validators.required]],
    endDate: [null, [Validators.required]],
    startHour: [null, [Validators.required]],
    endHour: [null, [Validators.required]],
    duration: [null, [Validators.required]],
    sunday: [false],
    monday: [false],
    tuesday: [false],
    wednesday: [false],
    thursday: [false],
    friday: [false],
    saturday: [false],
  });

  constructor(
    private agendaService: AgendaService,
    private resourceService: ResourceService,
    private fb: FormBuilder,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.resourceService.findAllByFilter({ active: true }).subscribe(
      (res: HttpResponse<IResource[]>) => this.resources = res.body!
    )
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    this.subscribeToSaveResponse(this.agendaService.create(this.createFromForm()));
  }

  private createFromForm(): ISaveAgenda {
    return {
      id: this.myForm.get(['id'])!.value,
      organizationId: this.authService.getOrganizationId()!,
      resource: this.myForm.get(['resource'])!.value,
      startDate: formatDateFromIDate(this.myForm.get(['startDate'])!.value),
      endDate: formatDateFromIDate(this.myForm.get(['endDate'])!.value),
      startHour: formatTimeFromITime(this.myForm.get(['startHour'])!.value),
      endHour: formatTimeFromITime(this.myForm.get(['endHour'])!.value),
      duration: this.myForm.get(['duration'])!.value,
      sunday: this.myForm.get(['sunday'])!.value,
      monday: this.myForm.get(['monday'])!.value,
      tuesday: this.myForm.get(['tuesday'])!.value,
      wednesday: this.myForm.get(['wednesday'])!.value,
      thursday: this.myForm.get(['thursday'])!.value,
      friday: this.myForm.get(['friday'])!.value,
      saturday: this.myForm.get(['saturday'])!.value,
    };
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<ISaveAgenda>>): void {
    result.subscribe(
      () => this.previousState(),
      () => this.isSaving = false
    );
  }
}
