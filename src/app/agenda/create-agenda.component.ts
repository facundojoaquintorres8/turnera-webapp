import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AgendaService } from './agenda.service';
import { AuthService } from '../auth/auth.service';
import { ISaveAgenda, RepeatTypeEnum } from '../models/agenda.models';
import { IResource } from '../models/resource.models';
import { ResourceService } from '../resource/resource.service';
import { formatDateFromNgbDateStruct, formatTimeFromNgbTimeStruct } from '../shared/date-format';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import * as momentTimeZone from 'moment-timezone';

@Component({
  selector: 'app-create-agenda',
  templateUrl: './create-agenda.component.html',
  styleUrls: ['./agenda.scss']
})
export class CreateAgendaComponent implements OnInit {
  isSaving = false;

  resources!: IResource[];
  repeatTypes: any = RepeatTypeEnum;
  showDaysOfWeek!: boolean;
  repeatingMonthDay!: string;

  private now: Date = new Date();
  private today: NgbDateStruct = { year: this.now.getFullYear(), month: this.now.getMonth() + 1, day: this.now.getDate() }

  public minDate = (): NgbDateStruct => { return this.myForm.get(['startDate'])!.value };
  public minDateToFinalize = (): NgbDateStruct => { return this.myForm.get(['endDate'])!.value };

  myForm = this.fb.group({
    id: [],
    resource: [null, [Validators.required]],
    startDate: [this.today, [Validators.required]],
    endDate: [this.today, [Validators.required]],
    startHour: [{ hour: 8, minute: 0, second: 0 }, [Validators.required]],
    endHour: [{ hour: 9, minute: 0, second: 0 }, [Validators.required]],
    zoneId: [null],
    segmented: [null],
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

    this.myForm.get('zoneId')?.setValue(momentTimeZone.tz.guess());
  }

  previousState(): void { // TODO: descomentar post pruebas de back
    // window.history.back();
  }

  areValidTimes(): boolean {
    const startHour = this.myForm.get(['startHour'])!.value as NgbTimeStruct;
    const endHour = this.myForm.get(['endHour'])!.value as NgbTimeStruct;
    const startDate = this.myForm.get(['startDate'])!.value as NgbDateStruct;
    const endDate = this.myForm.get(['endDate'])!.value as NgbDateStruct;
    if (startHour && endHour) {
      if (endHour.hour === 0 && endHour.minute === 0) {
        return true;
      }
      if (startHour.hour > endHour.hour) { // TODO: Ajustar que falla...
        const startDateMoment = moment();
        startDateMoment.date(startDate.day);
        startDateMoment.month(startDate.month - 1);
        startDateMoment.year(startDate.year);
        const endDateMoment = moment();
        endDateMoment.date(endDate.day);
        endDateMoment.month(endDate.month - 1);
        endDateMoment.year(endDate.year);

        console.log(startDateMoment.isSameOrAfter(endDateMoment));
        if (startDateMoment.isSameOrAfter(endDateMoment)) {
          console.log(startDateMoment);
          console.log(endDateMoment);
          return false;
        }
      }
      if (startHour.hour === endHour.hour && (startHour.minute === endHour.minute || startHour.minute > endHour.minute)) {
        return false;
      }
    }
    return true;
  }

  hasAnyDaySelected(): boolean { // TODO:
    return true;
    // return (this.showDaysOfWeek && (this.myForm.get(['sunday'])!.value || this.myForm.get(['monday'])!.value ||
    //   this.myForm.get(['tuesday'])!.value || this.myForm.get(['wednesday'])!.value ||
    //   this.myForm.get(['thursday'])!.value || this.myForm.get(['friday'])!.value ||
    //   this.myForm.get(['saturday'])!.value)) || !this.showDaysOfWeek;
  }

  onStartDateChange(): void {
    if (this.myForm.get(['startDate'])!.value && this.myForm.get(['endDate'])!.value
      && (moment(this.myForm.get(['startDate'])!.value).diff(moment(this.myForm.get(['endDate'])!.value)) > 0
        || Number.isNaN(moment(this.myForm.get(['startDate'])!.value).diff(moment(this.myForm.get(['endDate'])!.value))))) {
      this.myForm.get('endDate')?.setValue(null);
    }

    this.repeatingMonthDay = '';
    if (RepeatTypeEnum[this.myForm.get('repeatType')!.value] === RepeatTypeEnum.MONTHLY && this.myForm.get(['startDate'])!.value) {
      this.repeatingMonthDay = 'Mensualmente cada ' + parseInt(moment(formatDateFromNgbDateStruct(this.myForm.get(['startDate'])!.value)).format('DD'), 10);
    }
  }

  onSegmentedChange(): void {
    this.myForm.controls['duration'].reset();
    if (this.myForm.get('segmented')!.value) {
      this.myForm.controls['duration'].setValidators([Validators.required, Validators.min(5)]);
    } else {
      this.myForm.controls['duration'].clearValidators();
    }
  }

  onRepeatChange(): void {
    if (this.myForm.get('repeat')!.value) {
      if (!this.myForm.get('repeatType')!.value) {
        this.myForm.get('repeatType')?.setValue('DAILY');
      }
      this.myForm.controls['repeatType'].setValidators([Validators.required]);
      this.myForm.controls['finalize'].setValidators([Validators.required]);
      this.showDaysOfWeek = RepeatTypeEnum[this.myForm.get('repeatType')!.value] === RepeatTypeEnum.WEEKLY;
    } else {
      this.myForm.controls['repeatType'].clearValidators();
      this.myForm.controls['finalize'].clearValidators();
    }
  }

  onRepeatTypeChange(): void {
    this.showDaysOfWeek = RepeatTypeEnum[this.myForm.get('repeatType')!.value] === RepeatTypeEnum.WEEKLY;

    this.repeatingMonthDay = '';
    if (RepeatTypeEnum[this.myForm.get('repeatType')!.value] === RepeatTypeEnum.MONTHLY && this.myForm.get(['startDate'])!.value) {
      this.repeatingMonthDay = 'Mensualmente cada ' + parseInt(moment(formatDateFromNgbDateStruct(this.myForm.get(['startDate'])!.value)).format('DD'), 10);
    }
  }

  originalOrder = (): number => {
    return 0;
  }

  save(): void { // TODO: Descomentar después de probar el back solo
    // if (!this.areValidTimes()) {
    //   return;
    // }
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
      zoneId: this.myForm.get(['zoneId'])!.value,
      segmented: this.myForm.get(['segmented'])!.value,
      duration: this.myForm.get(['duration'])!.value,
      repeat: this.myForm.get(['repeat'])!.value,
      repeatType: this.myForm.get(['repeatType'])!.value,
      finalize: formatDateFromNgbDateStruct(this.myForm.get(['finalize'])!.value),
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
