import { IAgenda } from "./agenda.models";
import { IQuickCustomer } from "./customer.models";

export interface IAppointment {
    id: number;
    customerBusinessName: string;
    lastAppointmentStatus: IAppointmentStatus;
}

export interface IAppointmentSave {
    customer: IQuickCustomer;
    agenda: IAgenda;
}

export interface IAppointmentChangeStatus {
    id: number;
    observations: string;
}

export interface IAppointmentStatus {
    id: number;
    observations: string;
    status: AppointmentStatusEnum;
}

export enum AppointmentStatusEnum {
    FREE,
    BOOKED,
    ABSENT,
    CANCELLED,
    IN_ATTENTION,
    FINALIZED
}