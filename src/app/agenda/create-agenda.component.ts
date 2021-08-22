import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AgendaService } from './agenda.service';
import { AuthService } from '../auth/auth.service';
import { ISaveAgenda } from '../models/agenda.models';
import { IResource } from '../models/resource.models';
import { ResourceService } from '../resource/resource.service';
import { formatDateFromNgbDateStruct, formatTimeFromNgbTimeStruct } from '../shared/date-format';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-create-agenda',
  templateUrl: './create-agenda.component.html',
  styleUrls: ['./agenda.scss']
})
export class CreateAgendaComponent implements OnInit {
  isSaving = false;

  resources!: IResource[];

  now: Date = new Date();
  today: NgbDateStruct = { year: this.now.getFullYear(), month: this.now.getMonth() + 1, day: this.now.getDate() }

  public minDate = (): NgbDateStruct => { return this.myForm.get(['startDate'])!.value };

  myForm = this.fb.group({
    id: [],
    resource: [null, [Validators.required]],
    startDate: [this.today, [Validators.required]],
    endDate: [this.today, [Validators.required]],
    startHour: [{ hour: 8, minute: 0, second: 0 }, [Validators.required]],
    endHour: [{ hour: 9, minute: 0, second: 0 }, [Validators.required]],
    zoneId: [null],
    segmented: [null],
    // TODO: validar si segmented es true
    // duration: [null, [Validators.required, Validators.min(1)]],
    duration: [null],
    repeat: [null],
    repeatType: [null],
    finalize: [null],
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
  ) { }

  ngOnInit(): void {
    this.resourceService.findAllByFilter({ active: true }).subscribe(
      (res: HttpResponse<any>) => this.resources = res.body.content!
    )
  }

  previousState(): void {
    window.history.back();
  }

  areValidTimes(): boolean {
    const startHour = this.myForm.get(['startHour'])!.value as NgbTimeStruct;
    const endHour = this.myForm.get(['endHour'])!.value as NgbTimeStruct;
    if (startHour && endHour) {
      if (endHour.hour === 0 && endHour.minute === 0) {
        return true;
      }
      if (startHour.hour > endHour.hour) {
        return false;
      }
      if (startHour.hour === endHour.hour && (startHour.minute === endHour.minute || startHour.minute > endHour.minute)) {
        return false;
      }
    }
    return true;
  }

  hasAnyDaySelected(): boolean {
    return this.myForm.get(['sunday'])!.value || this.myForm.get(['monday'])!.value ||
      this.myForm.get(['tuesday'])!.value || this.myForm.get(['wednesday'])!.value ||
      this.myForm.get(['thursday'])!.value || this.myForm.get(['friday'])!.value ||
      this.myForm.get(['saturday'])!.value;
  }

  getButtonCreateTitle(validForm: boolean): string {
    if (validForm) {
      if (!this.areValidTimes()) {
        return 'La Hora Inicio debe ser menor a la Hora Fin.';
      }
      if (!this.hasAnyDaySelected()) {
        return 'Debe seleccionar al menos un día de la semana.';
      }
    }
    return 'Guardar';
  }

  onStartDateChange(): void {
    if (this.myForm.get(['startDate'])!.value && this.myForm.get(['endDate'])!.value
      && moment(this.myForm.get(['startDate'])!.value).isAfter(moment(this.myForm.get(['endDate'])!.value))) {
      this.myForm.get('endDate')?.setValue(null);
    }
  }

  save(): void {
    if (!this.areValidTimes()) {
      return;
    }
    this.isSaving = true;
    this.subscribeToSaveResponse(this.agendaService.create(this.createFromForm()));
  }

  private createFromForm(): ISaveAgenda {
    return {
      id: this.myForm.get(['id'])!.value,
      organizationId: this.authService.getOrganizationId()!,
      resource: this.myForm.get(['resource'])!.value,
      startDate: formatDateFromNgbDateStruct(this.myForm.get(['startDate'])!.value),
      endDate: formatDateFromNgbDateStruct(this.myForm.get(['endDate'])!.value),
      startHour: formatTimeFromNgbTimeStruct(this.myForm.get(['startHour'])!.value),
      endHour: formatTimeFromNgbTimeStruct(this.myForm.get(['endHour'])!.value),
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
