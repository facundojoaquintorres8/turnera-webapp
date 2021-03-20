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
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-agenda',
  templateUrl: './create-agenda.component.html'
})
export class CreateAgendaComponent implements OnInit {
  isSaving = false;

  resources!: IResource[];

  now: Date = new Date();
  today: NgbDateStruct = { year: this.now.getFullYear(), month: this.now.getMonth() + 1, day: this.now.getDate()}

  public maxDate = (): NgbDateStruct => { return this.myForm.get(['endDate'])!.value };
  public minDate = (): NgbDateStruct => { return this.myForm.get(['startDate'])!.value };

  myForm = this.fb.group({
    id: [],
    resource: [null, [Validators.required]],
    startDate: [this.today, [Validators.required]],
    endDate: [this.today, [Validators.required]],
    startHour: [null, [Validators.required]],
    endHour: [null, [Validators.required]],
    duration: [null, [Validators.required, Validators.min(1)]],
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

  hasAnyDaySelected(): boolean {
    return this.myForm.get(['sunday'])!.value || this.myForm.get(['monday'])!.value ||
    this.myForm.get(['tuesday'])!.value || this.myForm.get(['wednesday'])!.value ||
    this.myForm.get(['thursday'])!.value || this.myForm.get(['friday'])!.value ||
    this.myForm.get(['saturday'])!.value;
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
