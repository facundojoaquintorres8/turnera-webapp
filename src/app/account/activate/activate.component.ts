import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastService } from 'src/app/component/toast/toast.service';
import { IActivateAccount } from 'src/app/models/account.models';
import { IUser } from 'src/app/models/user.models';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html'
})
export class ActivateComponent implements OnInit {
  isSaving = false;

  activationKey!: string;

  myForm = this.fb.group({
    password: [null, [Validators.required]],
    passwordConfirm: [null, [Validators.required]],
  });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private accountService: AccountService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.activationKey = this.activatedRoute.snapshot.paramMap.get("activationKey")!;
  }

  previousState(): void {
    this.router.navigate(['login']);
  }

  save(): void {
    this.isSaving = true;
    this.subscribeToSaveResponse(this.accountService.activate(this.createFromForm()));
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<IUser>>): void {
    result.subscribe(
      () => {
        this.toastService.changeMessage(
          {
            showSuccessToast: true,
            successMessage: 'Su Cuenta ha sido activada con éxito. Ya puede ingresar al sistema.'
          }
        );
        this.router.navigate(['/']);
      },
      () => this.isSaving = false
    );
  }

  private createFromForm(): IActivateAccount {
    return {
      password: this.myForm.get(['password'])!.value,
      activationKey: this.activationKey,
    };
  }
}
