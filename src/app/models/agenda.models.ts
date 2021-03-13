import { IAppointment } from "./appointment.model";
import { IResource } from "./resource.models";

export interface IAgenda {
  id: number;
  resource: IResource;
  startDate: Date;
  endDate: Date;
  lastAppointment: IAppointment;
}

export interface ISaveAgenda {
  id: number;
  organizationId: number;
  resource: IResource;
  startDate: string;
  endDate: string;
  startHour: string;
  endHour: string;
  duration: number;
  sunday: boolean;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
}