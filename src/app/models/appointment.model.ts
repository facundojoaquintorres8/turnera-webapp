import { IAgenda } from "./agenda.models";
import { IQuickCustomer } from "./customer.models";

export interface IAppointment {
    id: number;
    customerBusinessName: string;
    currentStatus: AppointmentStatusEnum;
}

export interface ISaveAppointment {
    customer: IQuickCustomer;
    agenda: IAgenda;
}

export enum AppointmentStatusEnum {
    FREE,
    BOOKED,
    ABSENT,
    CANCELLED,
    IN_ATTENTION,
    FINALIZED
}