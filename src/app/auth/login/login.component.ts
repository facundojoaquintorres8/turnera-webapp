import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin, ISessionUser } from 'src/app/models/login.models';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  isSaving = false;

  myForm = this.fb.group({
    username: [null, [Validators.required, Validators.email, Validators.maxLength(100)]],
    password: [null, [Validators.required]],
  });

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.logout();
  }

  login(): void {
    this.isSaving = true;
    this.authService.login(this.createFromForm()).subscribe(
      (res: HttpResponse<ISessionUser>) => {
        this.authService.onLoginSuccess(res.body!);
        this.router.navigate(['/schedule']);
      },
      () => this.isSaving = false
    );
  }

  private createFromForm(): ILogin {
    return {
      username: this.myForm.get(['username'])!.value,
      password: this.myForm.get(['password'])!.value,
    };
  }
}
