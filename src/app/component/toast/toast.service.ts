import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ToastService {

  public showToast!: IToast;
  public subject = new Subject<any>();
  private messageSource = new BehaviorSubject(this.showToast);
  public currentMessage = this.messageSource.asObservable();

  constructor() {}

  changeMessage(message: IToast): void {
    this.messageSource.next(message);
    setTimeout(() => {
      this.messageSource.next({
        showErrorToast: false,
        showSuccessToast: false,
      });
    }, 10000);
  }
}

export interface IToast {
  errorMessage?: string;
  successMessage?: string;
  infoMessage?: string;
  showErrorToast?: boolean;
  showSuccessToast?: boolean;
  showInfoToast?: boolean;
}
