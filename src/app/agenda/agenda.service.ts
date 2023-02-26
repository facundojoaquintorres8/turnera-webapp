import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../app.constants';
import { AuthService } from '../auth/auth.service';
import { IAgenda, ISaveAgenda } from '../models/agenda.models';
import { createRequestOption } from '../shared/request-util';
import * as momentTimeZone from 'moment-timezone';

@Injectable({ providedIn: 'root' })
export class AgendaService {
  public resourceUrl = SERVER_API_URL + 'api/agendas';
  private organizationId = this.authService.getOrganizationId();
  public viewDate: Date = new Date();

  constructor(private http: HttpClient, private authService: AuthService) {}

  findAllByFilter(filter: any): Observable<HttpResponse<IAgenda[]>> {
    filter['organizationId'] = this.organizationId;
    filter['sort'] = filter['sort'] ? filter['sort'] : ['ASC', 'startDate'];
    filter['zoneId'] = momentTimeZone.tz.guess();
    const options = createRequestOption(filter);
    return this.http.get<IAgenda[]>(`${this.resourceUrl}/findAllByFilter`, { params: options, observe: 'response' });
  }

  create(agenda: ISaveAgenda): Observable<HttpResponse<boolean>> {
    return this.http.post<boolean>(this.resourceUrl, agenda, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  desactivate(id: number): Observable<HttpResponse<IAgenda>> {
    return this.http.put<IAgenda>(`${this.resourceUrl}/${id}/desactivate`, {} ,{ observe: 'response' });
  }
}
