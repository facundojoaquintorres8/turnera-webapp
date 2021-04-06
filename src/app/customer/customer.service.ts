import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../app.constants';
import { AuthService } from '../auth/auth.service';
import { ICustomer } from '../models/customer.models';
import { createRequestOption } from '../shared/request-util';


@Injectable({ providedIn: 'root' })
export class CustomerService {
  public resourceUrl = SERVER_API_URL + 'api/customers';
  private organizationId = this.authService.getOrganizationId();

  constructor(private http: HttpClient, private authService: AuthService) {}

  findAllByFilter(filter: any): Observable<HttpResponse<ICustomer[]>> {
    filter['organizationId'] = this.organizationId;
    filter['sort'] = filter['sort'] ? filter['sort'] : ['ASC', 'businessName'];
    const options = createRequestOption(filter);
    return this.http.get<ICustomer[]>(`${this.resourceUrl}/findAllByFilter`, { params: options, observe: 'response' });
  }

  find(id: number): Observable<HttpResponse<ICustomer>> {
    return this.http.get<ICustomer>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  create(customer: ICustomer): Observable<HttpResponse<ICustomer>> {
    return this.http.post<ICustomer>(this.resourceUrl, customer, { observe: 'response' });
  }

  update(customer: ICustomer): Observable<HttpResponse<ICustomer>> {
    return this.http.put<ICustomer>(this.resourceUrl, customer, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
