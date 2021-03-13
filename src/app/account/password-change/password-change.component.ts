import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { IPasswordChange } from 'src/app/models/account.models';
import { IUser } from 'src/app/models/user.models';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html'
})
export class PasswordChangeComponent implements OnInit {
  isSaving = false;

  myForm = this.fb.group({
    currentPassword: [null, [Validators.required]],
    password: [null, [Validators.required]],
    passwordConfirm: [null, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {}

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    this.subscribeToSaveResponse(this.accountService.passwordChange(this.createFromForm()));
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<IUser>>): void {
    result.subscribe(
      () => this.previousState(),
      () => this.isSaving = false
    );
  }

  private createFromForm(): IPasswordChange {
    return {
      username: this.authService.getSessionUser()?.username!,
      currentPassword: this.myForm.get(['currentPassword'])!.value,
      password: this.myForm.get(['password'])!.value,
    };
  }
}
