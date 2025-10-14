import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, NonNullableFormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { Util } from 'src/app/common/util';
import { CustomValidators } from 'src/app/common/validators';
import { BaseCompleteComponent } from 'src/app/components/base/base-complete.component';
import { IAuthResponse } from 'src/app/models/interfaces/auth-response';
import { ILogin, ISignUp } from 'src/app/models/interfaces/login';
import { AuthService } from 'src/app/services/auth.service';
import { AuthDataService } from 'src/app/services/data/auth-data.service';

@Component({
  selector: 'shop-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent extends BaseCompleteComponent implements OnInit {
  public userForm!: FormGroup;
  public isSignUp = false;
  public formError: string | null = null;

  constructor(
    private readonly fb: NonNullableFormBuilder,
    private readonly authData: AuthDataService,
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    super();
  }

  public ngOnInit(): void {
    this.isSignUp = this.route.snapshot.routeConfig?.path === 'sign-up';
    this.userForm = this.isSignUp
      ? this.buildSignUpForm()
      : this.buildLoginForm();
  }

  public goToHome(): void {
    this.router.navigate(['/']);
  }

  public toggleAuth(): void {
    this.router.navigate([this.isSignUp ? '/login' : '/sign-up']);
  }

  public getErrorMessage(controlName: string): string | null {
    const control = this.userForm.get(controlName);
    return CustomValidators.getErrorMessage(control);
  }

  public submit(): void {
    this.formError = null;

    if (this.isSignUp) {
      this.validatePasswords();
    }

    if (this.userForm.invalid) {
      Util.markAllAsDirty(this.userForm);
      return;
    }

    const action$ = this.isSignUp
      ? this.authData.signUp(this.userForm.getRawValue() as ISignUp)
      : this.authData.login(this.userForm.getRawValue() as ILogin);

    action$.pipe(takeUntil(this.__unsubscribe$)).subscribe({
      next: (data: IAuthResponse) => {
        this.auth.setToken(data.token);
        this.goToHome();
      },
      error: (err) => this.handleError(err),
    });
  }

  private validatePasswords(): void {
    const { password, confirmPassword } = this.userForm.controls;
    if (!password || !confirmPassword) {
      return;
    }

    const mismatch = password.value !== confirmPassword.value;
    confirmPassword.setErrors(
      mismatch ? { ...confirmPassword.errors, passwordMismatch: true } : null
    );
  }

  private handleError(err: any): void {
    const errorCode = err?.error?.code ?? err?.error?.error;
    const message =
      errorCode === 'InvalidGrant'
        ? 'Incorrect username or password'
        : err?.error?.message ||
          (this.isSignUp ? 'Sign up failed' : 'Sign in failed');

    this.formError = message;
  }

  private buildLoginForm(): FormGroup {
    return this.fb.group({
      userName: this.fb.control('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        CustomValidators.noSpaces(),
        CustomValidators.userNamePattern(),
      ]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        CustomValidators.noSpaces(),
      ]),
    });
  }

  private buildSignUpForm(): FormGroup {
    return this.fb.group({
      userName: this.fb.control('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        CustomValidators.noSpaces(),
        CustomValidators.userNamePattern(),
      ]),
      firstName: this.fb.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        CustomValidators.noSpaces(),
      ]),
      lastName: this.fb.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        CustomValidators.noSpaces(),
      ]),
      email: this.fb.control('', [
        Validators.required,
        Validators.email,
        CustomValidators.noSpaces(),
      ]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        CustomValidators.noSpaces(),
      ]),
      confirmPassword: this.fb.control('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        CustomValidators.noSpaces(),
      ]),
    });
  }
}
