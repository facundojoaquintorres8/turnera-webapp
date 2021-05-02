import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../app.constants';
import { IAppointment, IAppointmentChangeStatus, IAppointmentSave } from '../models/appointment.model';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  public resourceUrl = SERVER_API_URL + 'api/appointments';

  constructor(private http: HttpClient) {}

  book(appointment: IAppointmentSave): Observable<HttpResponse<IAppointment>> {
    return this.http.post<IAppointment>(this.resourceUrl, appointment, { observe: 'response' });
  }

  absent(appointmentChangeStatus: IAppointmentChangeStatus): Observable<HttpResponse<IAppointment>> {
    return this.http.post<IAppointment>(`${this.resourceUrl}/absent`, appointmentChangeStatus, { observe: 'response' });
  }
  
  cancel(appointmentChangeStatus: IAppointmentChangeStatus): Observable<HttpResponse<IAppointment>> {
    return this.http.post<IAppointment>(`${this.resourceUrl}/cancel`, appointmentChangeStatus, { observe: 'response' });
  }
  
  attend(appointmentChangeStatus: IAppointmentChangeStatus): Observable<HttpResponse<IAppointment>> {
    return this.http.post<IAppointment>(`${this.resourceUrl}/attend`, appointmentChangeStatus, { observe: 'response' });
  }
  
  finalize(appointmentChangeStatus: IAppointmentChangeStatus): Observable<HttpResponse<IAppointment>> {
    return this.http.post<IAppointment>(`${this.resourceUrl}/finalize`, appointmentChangeStatus, { observe: 'response' });
  }
}
