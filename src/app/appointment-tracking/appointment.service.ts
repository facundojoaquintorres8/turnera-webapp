import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../app.constants';
import { IAppointment, IAppointmentCancel, IAppointmentSave } from '../models/appointment.model';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  public resourceUrl = SERVER_API_URL + 'api/appointments';

  constructor(private http: HttpClient) {}

  book(appointment: IAppointmentSave): Observable<HttpResponse<IAppointment>> {
    return this.http.post<IAppointment>(this.resourceUrl, appointment, { observe: 'response' });
  }

  absent(id: number): Observable<HttpResponse<IAppointment>> {
    return this.http.get<IAppointment>(`${this.resourceUrl}/${id}/absent`, { observe: 'response' });
  }
  
  cancel(appointmentCancel: IAppointmentCancel): Observable<HttpResponse<IAppointment>> {
    return this.http.post<IAppointment>(`${this.resourceUrl}/cancel`, appointmentCancel, { observe: 'response' });
  }
  
  attend(id: number): Observable<HttpResponse<IAppointment>> {
    return this.http.get<IAppointment>(`${this.resourceUrl}/${id}/attend`, { observe: 'response' });
  }
  
  finalize(id: number): Observable<HttpResponse<IAppointment>> {
    return this.http.get<IAppointment>(`${this.resourceUrl}/${id}/finalize`, { observe: 'response' });
  }
}
