import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../app.constants';
import { ILogin, ISessionUser } from '../models/login.models';
import { IUser } from '../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public resourceUrl = SERVER_API_URL + 'api/authenticate';

  constructor(private http: HttpClient) {}

  login(login: ILogin): Observable<HttpResponse<ISessionUser>> {
    return this.http.post<ISessionUser>(this.resourceUrl, login, { observe: 'response' });
  }

  public logout(): void {
    localStorage.clear();
  }

  public onLoginSuccess(login: ISessionUser): void {
    this.setSessionUser(login.user);
    this.setToken(login.token);
  }

  public isAuthenicate(): boolean {
    return this.getSessionUser() !== null && this.getToken() !== null;
  }

  private setSessionUser(user: IUser): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getSessionUser(): IUser | null {
    return JSON.parse(localStorage.getItem('user')!);
  }

  private setToken(jwt: string): void {
    localStorage.setItem('jwt', jwt);
  }

  public getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  public getOrganizationId(): number | null {
    return this.getSessionUser()?.organizationId!;
  }

  public getPermissions(): string[] {
    let sessionUserPermissions: string[] = [];
    const groupPermissionsByProfile = this.getSessionUser()?.profiles.map(x => x.permissions.map(y => y.code));
    groupPermissionsByProfile?.forEach(p => {
        sessionUserPermissions = [...sessionUserPermissions, ...p];
    });
    return sessionUserPermissions;
  }

}
