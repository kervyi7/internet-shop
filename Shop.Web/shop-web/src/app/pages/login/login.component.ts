import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthDataService } from '../../services/data/auth-data.service';
import { BaseCompleteComponent } from '../../components/base/base-complete.component';
import { ILogin } from '../../models/interfaces/login';
import { takeUntil } from 'rxjs';
import { IAuthResponse } from '../../models/interfaces/auth-response';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'shop-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseCompleteComponent {
  public userForm: UntypedFormGroup;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _authDataService: AuthDataService,
    private _authService: AuthService) {
    super();
    this.userForm = this.getUserForm();
  }

  public submit() {
    const login: ILogin = { userName: this.userForm.controls["userName"].value, password: this.userForm.controls["password"].value }
    this._authDataService.login(login)
      .pipe(
        takeUntil(this.__unsubscribe$))
      .subscribe((data: IAuthResponse) => {
        if (data) {
          this._authService.setToken(data.token);
        }
      });
  }

  private getUserForm(): UntypedFormGroup {
    return this._formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
