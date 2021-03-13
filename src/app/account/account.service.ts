import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../app.constants';
import { IActivateAccount, IPasswordChange, IPasswordReset, IPasswordResetRequest, IRegister } from '../models/account.models';
import { IUser } from '../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public resourceUrl = SERVER_API_URL + 'api/account';

  constructor(private http: HttpClient) {}

  register(register: IRegister): Observable<HttpResponse<IUser>> {
    return this.http.post<IUser>(`${this.resourceUrl}/register`, register, { observe: 'response' });
  }

  activate(activate: IActivateAccount): Observable<HttpResponse<IUser>> {
    return this.http.post<IUser>(`${this.resourceUrl}/activate`, activate, { observe: 'response' });
  }

  passwordResetRequest(passwordResetRequest: IPasswordResetRequest): Observable<HttpResponse<IUser>> {
    return this.http.post<IUser>(`${this.resourceUrl}/password-reset/request`, passwordResetRequest, { observe: 'response' });
  }

  passwordReset(passwordReset: IPasswordReset): Observable<HttpResponse<IUser>> {
    return this.http.post<IUser>(`${this.resourceUrl}/password-reset`, passwordReset, { observe: 'response' });
  }

  passwordChange(passwordChange: IPasswordChange): Observable<HttpResponse<IUser>> {
    return this.http.post<IUser>(`${this.resourceUrl}/password-change`, passwordChange, { observe: 'response' });
  }
}
