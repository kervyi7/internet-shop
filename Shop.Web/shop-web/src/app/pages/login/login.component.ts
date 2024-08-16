import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthDataService } from '../../services/data/auth-data.service';
import { BaseCompleteComponent } from '../../components/base/base-complete.component';
import { ILogin } from '../../models/interfaces/login';
import { takeUntil } from 'rxjs';
import { IAuthResponse } from '../../models/interfaces/auth-response';
import { AuthService } from '../../services/auth.service';
import { ILoginForm } from '../../models/interfaces/forms/login-form';
import { Router } from '@angular/router';

@Component({
  selector: 'shop-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseCompleteComponent {
  public userForm: FormGroup<ILoginForm>;

  constructor(
    private _authDataService: AuthDataService,
    private _authService: AuthService,
    private _router: Router) {
    super();
    this.userForm = this.getUserForm();
  }

  public goToHome(): void {
    this._router.navigate([`/`]);
  }

  public submit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    const login: ILogin = { ...this.userForm.getRawValue() }
    this._authDataService.login(login)
      .pipe(
        takeUntil(this.__unsubscribe$))
      .subscribe((data: IAuthResponse) => {
        if (data) {
          this._authService.setToken(data.token);
          this.goToHome();
        }
      });
  }

  private getUserForm(): FormGroup<ILoginForm> {
    return new FormGroup<ILoginForm>({
      userName: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });
  }
}
