import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CustomValidators } from 'src/app/common/validators';
import {
  ChangePassword,
  UpdateUser,
  User,
} from 'src/app/models/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserDataService } from 'src/app/services/data/user-data.service';

@Component({
  selector: 'shop-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecurityComponent implements OnInit {
  public passwordForm!: FormGroup;
  public userId: string;

  constructor(
    private fb: NonNullableFormBuilder,
    private userService: UserDataService,
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.initPasswordForm();
  }

  public changePassword(): void {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    const model: ChangePassword = {
      userId: this.userId,
      currentPassword: this.passwordForm.value.currentPassword,
      newPassword: this.passwordForm.value.newPassword,
    };

    this.userService.changePassword(model).subscribe({
      next: () => {
        this.passwordForm.reset();
        this.cd.markForCheck();
      },
    });
  }

  public getErrorMessage(controlName: string): string | null {
    if (!this.passwordForm) {
      return null;
    }

    const control = this.passwordForm.get(controlName);
    return CustomValidators.getErrorMessage(control);
  }

  private initPasswordForm(): void {
    this.passwordForm = this.fb.group(
      {
        currentPassword: this.fb.control('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        newPassword: this.fb.control('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: this.fb.control('', [Validators.required]),
      },
      { validators: this.passwordsMatch }
    );
  }

  private passwordsMatch(
    group: AbstractControl
  ): { [key: string]: any } | null {
    const newPass = group.get('newPassword')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return newPass === confirm ? null : { passwordMismatch: true };
  }
}
