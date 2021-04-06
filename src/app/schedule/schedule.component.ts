import { DatePipe } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarEvent, CalendarMonthViewBeforeRenderEvent, CalendarView } from 'angular-calendar';
import { AgendaService } from '../agenda/agenda.service';
import { AuthService } from '../auth/auth.service';
import { IAgenda } from '../models/agenda.models';
import { AppointmentStatusEnum, IAppointment } from '../models/appointment.model';
import { checkPermission } from '../security/check-permissions';
import { formatDateFromDate } from '../shared/date-format';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.scss']
})
export class ScheduleComponent implements OnInit {

  permissions: string[] = [];
  canViewAgendas: boolean = false;
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

  appointmentStatusTranslate = {
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
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.permissions = this.authService.getPermissions();
    this.canViewAgendas = checkPermission(this.permissions, ['agendas.read']);
    if (this.canViewAgendas) {
      this.onCalendarChange();      
    }
  }

  dayClicked(): void {
    if (this.canViewAgendas) {
      this.router.navigate(['/appointment-tracking']);
    }
  }

  handleEvent(event: CalendarEvent): void {
  }

  closeOpenMonthViewDay(): void {
    if (this.canViewAgendas) {
      this.onCalendarChange();      
    }
  }

  onCalendarChange(): void {
    this.loading = true;
    this.agendaService.findAllByFilter({ ignorePaginated: true, page: 0, ...this.createFromForm() }).subscribe(
      (res: HttpResponse<any>) => {
        this.events = res.body.content.map((x: IAgenda) => ({
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

  private createFromForm(): any {
    const from = new Date(this.agendaService.viewDate.getFullYear(), this.agendaService.viewDate.getMonth(), 1);
    const to = new Date(this.agendaService.viewDate.getFullYear(), this.agendaService.viewDate.getMonth() + 1, 0);
    return {
      from: formatDateFromDate(from),
      to: formatDateFromDate(to),
      active: true
    };
  }

  getEventTitle(agenda: IAgenda): string {
    let title = this.datePipe.transform(agenda.startDate, 'dd-MM-yyyy HH:mm') + '\n' + agenda.resource.description;
    if (agenda.lastAppointment && this.appointmentStatus[agenda.lastAppointment.lastAppointmentStatus.status] !== AppointmentStatusEnum.CANCELLED) {
      title = title + '\n' + agenda.lastAppointment.customerBusinessName + ' (' + this.appointmentStatusTranslate[agenda.lastAppointment.lastAppointmentStatus.status] + ')';
    }
    return title;
  }

  getColor(lastAppointment: IAppointment): string {
    let result = 'bg-white border border-primary'; // Free or Cancelled
    if (lastAppointment) {
      switch (this.appointmentStatus[lastAppointment.lastAppointmentStatus.status]) {
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
    renderEvent.header.forEach((header: any) => {
      header.cssClass = 'titlecase'
    });
    renderEvent.body.forEach((day: any) => {
      if (day.date < today) {
        day.cssClass = 'bg-secondary';
      }
    });
  }

  quantityAppointmentsReserved(events: CalendarEvent[]): number {
    return !events.length ? 0 : events.filter(x => !x['available']).length;
  }
}
