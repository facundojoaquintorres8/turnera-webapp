import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbDateStruct, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AgendaService } from '../agenda/agenda.service';
import { DeleteAgendaModalComponent } from '../agenda/delete-agenda-modal.component';
import { DesactivateAgendaModalComponent } from '../agenda/desactivate-agenda-modal.component';
import { CustomerService } from '../customer/customer.service';
import { IAgenda } from '../models/agenda.models';
import { IAppointment } from '../models/appointment.model';
import { ICustomer } from '../models/customer.models';
import { IListItem } from '../models/list.models';
import { IResource } from '../models/resource.models';
import { IResourceType } from '../models/resourceType.models';
import { ResourceTypeService } from '../resource-type/resource-type.service';
import { ResourceService } from '../resource/resource.service';
import { formatDateFromNgbDateStruct, formatNgbDateStructFromDate } from '../shared/date-format';
import { AbsentAppointmentModalComponent } from './absent-appointment-modal.component';
import { AttendAppointmentModalComponent } from './attend-appointment-modal.component';
import { BookAppointmentComponent } from './book-appointment-modal.component';
import { CancelAppointmentModalComponent } from './cancel-appointment-modal.component';
import { FinalizeAppointmentModalComponent } from './finalize-appointment-modal.component';

@Component({
  selector: 'app-appointment-tracking',
  templateUrl: './appointment-tracking.component.html'
})
export class AppointmentTrackingComponent implements OnInit {
  private ngbModalRef: NgbModalRef | undefined;

  isSearching: boolean = false;
  agendas: IAgenda[] = [];
  resourcesTypes: IResourceType[] = [];
  resources: IResource[] = [];
  customers: ICustomer[] = [];
  appointmentStatus: IListItem[] = [];
  today: Date = this.agendaService.viewDate;
  firstDayMonth: Date = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
  lastDayMonth: Date = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0);

  appointmentStatusObject = {
    FREE: "Libre",
    BOOKED: "Reservado",
    ABSENT: "Ausente",
    CANCELLED: "Cancelado",
    IN_ATTENTION: "En Atención",
    FINALIZED: "Finalizado",
  }

  myForm = this.fb.group({
    resourceTypeId: [null],
    resourceId: [null],
    customerId: [null],
    status: [null],
    from: [formatNgbDateStructFromDate(this.firstDayMonth), [Validators.required]],
    to: [formatNgbDateStructFromDate(this.lastDayMonth), [Validators.required]],
  });

  public maxDate = (): NgbDateStruct => { return this.myForm.get(['to'])!.value };
  public minDate = (): NgbDateStruct => { return this.myForm.get(['from'])!.value };

  constructor(
    private agendaService: AgendaService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private resourceTypeService: ResourceTypeService,
    private resourceService: ResourceService,
    private customerService: CustomerService,
  ) { }

  ngOnInit(): void {
    this.getAgendas();

    this.resourceTypeService.findAllByFilter({}).subscribe(
      (res: HttpResponse<IResourceType[]>) => this.resourcesTypes = res.body || []
    );

    this.resourceService.findAllByFilter({}).subscribe(
      (res: HttpResponse<IResource[]>) => this.resources = res.body || []
    );

    this.customerService.findAllByFilter({}).subscribe(
      (res: HttpResponse<ICustomer[]>) => this.customers = res.body || []
    );

    Object.keys(this.appointmentStatusObject).map(key =>
      this.appointmentStatus.push({ id: key, value: this.appointmentStatusObject[key] })
    );
  }

  clear(): void {
    this.myForm.reset();
    this.myForm.get('from')?.setValue(formatNgbDateStructFromDate(this.firstDayMonth));
    this.myForm.get('to')?.setValue(formatNgbDateStructFromDate(this.lastDayMonth));
    this.getAgendas();
  }

  getAgendas(): void {
    this.isSearching = true;
    this.agendaService.findAllByFilter(this.createFromForm()).subscribe(
      (res: HttpResponse<IAgenda[]>) => { 
        this.agendas = res.body || [];
        this.isSearching = false;
      },
      () => this.isSearching = false
    );
  }

  private createFromForm(): any {
    return {
      resourceTypeId: this.myForm.get(['resourceTypeId'])!.value,
      resourceId: this.myForm.get(['resourceId'])!.value,
      customerId: this.myForm.get(['customerId'])!.value,
      status: this.myForm.get(['status'])!.value,
      from: formatDateFromNgbDateStruct(this.myForm.get(['from'])!.value),
      to: formatDateFromNgbDateStruct(this.myForm.get(['to'])!.value),
      active: true,
    };
  }

  onResourceTypeChange(): void {
    if (this.myForm.get('resourceTypeId')?.value === null) { 
      this.resourceService.findAllByFilter({}).subscribe(
        (res: HttpResponse<IResource[]>) => this.resources = res.body || []
      );  
    } else {
      this.resourceService.findAllByFilter({ resourceTypeId: this.myForm.get('resourceTypeId')?.value }).subscribe(
        (res: HttpResponse<IResource[]>) => this.resources = res.body || []
      );  
    }
  }

  onResourceChange(): void {
    if (this.myForm.get('resourceId')?.value !== null) {
      const resource = this.resources.find(x => x.id == this.myForm.get('resourceId')?.value);
      this.myForm.get('resourceTypeId')?.setValue(resource?.resourceType?.id);
      this.myForm.get('resourceTypeId')?.disable();
    } else {
      this.myForm.get('resourceTypeId')?.enable();
    }
  }

  appointmentStatusColor(lastAppointment: IAppointment): string {
    let result = 'badge badge-white border border-primary'; // Free
    if (lastAppointment) {
      switch (lastAppointment.lastAppointmentStatus.status.toString()) {
        case 'BOOKED':
          result = 'badge badge-warning';
          break;
        case 'ABSENT':
          result = 'badge badge-dark';
          break;
        case 'CANCELLED':
          result = 'badge badge-danger';
          break;
        case 'IN_ATTENTION':
          result = 'badge badge-info';
          break;
        case 'FINALIZED':
          result = 'badge badge-success';
          break;
      }
    }
    return result;
  }

  canBook(agenda: IAgenda): boolean {
    return (!agenda.lastAppointment || agenda.lastAppointment.lastAppointmentStatus.status.toString() === 'CANCELLED')
      && new Date(agenda.startDate) > new Date();
  }

  canAbsent(agenda: IAgenda): boolean {
    return agenda.lastAppointment && agenda.lastAppointment.lastAppointmentStatus.status.toString() === 'BOOKED';
  }

  canCancel(agenda: IAgenda): boolean {
    return agenda.lastAppointment && agenda.lastAppointment.lastAppointmentStatus.status.toString() === 'BOOKED';
  }

  canAttend(agenda: IAgenda): boolean {
    return agenda.lastAppointment && agenda.lastAppointment.lastAppointmentStatus.status.toString() === 'BOOKED';
  }

  canFinalize(agenda: IAgenda): boolean {
    return agenda.lastAppointment && agenda.lastAppointment.lastAppointmentStatus.status.toString() === 'IN_ATTENTION';
  }

  canDesactivate(agenda: IAgenda): boolean {
    return !agenda.lastAppointment || agenda.lastAppointment.lastAppointmentStatus.status.toString() === 'CANCELLED';
  }

  book(agenda: IAgenda): void {
    this.ngbModalRef = this.modalService.open(BookAppointmentComponent, { size: 'lg', backdrop: 'static' });
    this.ngbModalRef.componentInstance.agenda = agenda;
    this.ngbModalRef.result.then(
      () => {
        this.getAgendas();
        this.ngbModalRef = undefined;
      },
      () => {
        this.ngbModalRef = undefined;
      }
    );
  }

  absent(lastAppointment: IAppointment): void {
    this.ngbModalRef = this.modalService.open(AbsentAppointmentModalComponent, { size: 'lg', backdrop: 'static' });
    this.ngbModalRef.componentInstance.appointment = lastAppointment;
    this.ngbModalRef.result.then(
      () => {
        this.getAgendas();
        this.ngbModalRef = undefined;
      },
      () => {
        this.ngbModalRef = undefined;
      }
    );
  }

  cancel(lastAppointment: IAppointment): void {
    this.ngbModalRef = this.modalService.open(CancelAppointmentModalComponent, { size: 'lg', backdrop: 'static' });
    this.ngbModalRef.componentInstance.appointment = lastAppointment;
    this.ngbModalRef.result.then(
      () => {
        this.getAgendas();
        this.ngbModalRef = undefined;
      },
      () => {
        this.ngbModalRef = undefined;
      }
    );
  }

  attend(lastAppointment: IAppointment): void {
    this.ngbModalRef = this.modalService.open(AttendAppointmentModalComponent, { size: 'lg', backdrop: 'static' });
    this.ngbModalRef.componentInstance.appointment = lastAppointment;
    this.ngbModalRef.result.then(
      () => {
        this.getAgendas();
        this.ngbModalRef = undefined;
      },
      () => {
        this.ngbModalRef = undefined;
      }
    );
  }

  finalize(lastAppointment: IAppointment): void {
    this.ngbModalRef = this.modalService.open(FinalizeAppointmentModalComponent, { size: 'lg', backdrop: 'static' });
    this.ngbModalRef.componentInstance.appointment = lastAppointment;
    this.ngbModalRef.result.then(
      () => {
        this.getAgendas();
        this.ngbModalRef = undefined;
      },
      () => {
        this.ngbModalRef = undefined;
      }
    );
  }

  delete(agenda: IAgenda): void {
    this.ngbModalRef = this.modalService.open(DeleteAgendaModalComponent, { size: 'lg', backdrop: 'static' });
    this.ngbModalRef.componentInstance.agenda = agenda;
    this.ngbModalRef.result.then(
      () => {
        this.getAgendas();
        this.ngbModalRef = undefined;
      },
      () => {
        this.ngbModalRef = undefined;
      }
    );
  }

  desactivate(agenda: IAgenda): void {
    this.ngbModalRef = this.modalService.open(DesactivateAgendaModalComponent, { size: 'lg', backdrop: 'static' });
    this.ngbModalRef.componentInstance.agenda = agenda;
    this.ngbModalRef.result.then(
      () => {
        this.getAgendas();
        this.ngbModalRef = undefined;
      },
      () => {
        this.ngbModalRef = undefined;
      }
    );
  }

  previousState(): void {
    window.history.back();
  }
}
