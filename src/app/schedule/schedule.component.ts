import { DatePipe } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarEvent, CalendarMonthViewBeforeRenderEvent, CalendarView } from 'angular-calendar';
import { AgendaService } from '../agenda/agenda.service';
import { IAgenda } from '../models/agenda.models';
import { AppointmentStatusEnum, IAppointment } from '../models/appointment.model';
import { formatDateFromDate } from '../shared/date-format';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.scss']
})
export class ScheduleComponent implements OnInit {

  events: CalendarEvent[] = [];
  view: CalendarView = CalendarView.Month;
  today: string = this.datePipe.transform(new Date(), 'dd-MM-yyyy') + '';
  loading!: boolean;

  appointmentStatus = {
    ABSENT: AppointmentStatusEnum.ABSENT,
    BOOKED: AppointmentStatusEnum.BOOKED,
    CANCELLED: AppointmentStatusEnum.CANCELLED,
    FINALIZED: AppointmentStatusEnum.FINALIZED,
    FREE: AppointmentStatusEnum.FREE,
    IN_ATTENTION: AppointmentStatusEnum.IN_ATTENTION,
  }

  appointmentStatusTranslate= {
    FREE: "Libre",
    BOOKED: "Reservado",
    ABSENT: "Ausente",
    CANCELLED: "Cancelado",
    IN_ATTENTION: "En Atención",
    FINALIZED: "Finalizado",
  }

  constructor(
    public agendaService: AgendaService,
    private datePipe: DatePipe,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.onCalendarChange();
  }

  dayClicked(): void {
    this.router.navigate(['/appointment-tracking']);
  }

  handleEvent(event: CalendarEvent): void {
  }

  closeOpenMonthViewDay(): void {
    this.onCalendarChange();
  }

  onCalendarChange(): void {
    this.loading = true;
    this.agendaService.findAllByFilter(this.createFromForm()).subscribe(
      (res: HttpResponse<IAgenda[]>) => {
        this.events = res.body!.map(x => ({
          id: x.id,
          start: new Date(x.startDate),
          end: new Date(x.endDate),
          title: this.getEventTitle(x),
          cssClass: this.getColor(x.lastAppointment),
        }));
        this.loading = false;
      }
    );
  }

  private createFromForm(): {} {
    const from = new Date(this.agendaService.viewDate.getFullYear(), this.agendaService.viewDate.getMonth(), 1);
    const to = new Date(this.agendaService.viewDate.getFullYear(), this.agendaService.viewDate.getMonth() + 1, 0);
    return {
      from: formatDateFromDate(from),
      to: formatDateFromDate(to),
    };
  }

  getEventTitle(agenda: IAgenda): string {
    let title = this.datePipe.transform(agenda.startDate, 'dd-MM-yyyy HH:mm') + '<br>' + agenda.resource.description;
    if (agenda.lastAppointment && this.appointmentStatus[agenda.lastAppointment.currentStatus] !== AppointmentStatusEnum.CANCELLED) {
      title = title + '<br>' + agenda.lastAppointment.customerBusinessName + ' (' + this.appointmentStatusTranslate[agenda.lastAppointment.currentStatus] + ')';
    }
    return title;
  }

  getColor(lastAppointment: IAppointment): string {
    let result = 'bg-white border border-primary'; // Free or Cancelled
    if (lastAppointment) {
      switch (this.appointmentStatus[lastAppointment.currentStatus]) {
        case AppointmentStatusEnum.BOOKED:
          result = 'bg-warning';
          break;
        case AppointmentStatusEnum.ABSENT:
          result = 'bg-dark';
          break;
        case AppointmentStatusEnum.IN_ATTENTION:
          result = 'bg-info';
          break;
        case AppointmentStatusEnum.FINALIZED:
          result = 'bg-success';
          break;
      }
    }
    return result;
  }

  beforeMonthViewRender(renderEvent: CalendarMonthViewBeforeRenderEvent): void {
    const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    renderEvent.body.forEach((day: any) => {
      if (day.date < today) {
        day.cssClass = 'bg-secondary';
      }
    });
  }
}
