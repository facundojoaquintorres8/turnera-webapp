import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../app.constants';
import { AuthService } from '../auth/auth.service';
import { IOrganization } from '../models/organization.models';

@Injectable({ providedIn: 'root' })
export class OrganizationService {
  public resourceUrl = SERVER_API_URL + 'api/organizations';
  private organizationId = this.authService.getOrganizationId();

  constructor(private http: HttpClient, private authService: AuthService) {}

  find(): Observable<HttpResponse<IOrganization>> {
    return this.http.get<IOrganization>(`${this.resourceUrl}/${this.organizationId}`, { observe: 'response' });
  }

  update(organization: IOrganization): Observable<HttpResponse<IOrganization>> {
    return this.http.put<IOrganization>(this.resourceUrl, organization, { observe: 'response' });
  }
}
