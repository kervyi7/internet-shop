import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CustomValidators } from 'src/app/common/validators';
import { User, UpdateUser } from 'src/app/models/interfaces/user';
import { UserDataService } from 'src/app/services/data/user-data.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'shop-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {
  public user!: User;
  public userId!: string;

  public formVisible = false;
  public profileForm!: FormGroup;

  public fields = [
    {
      name: 'firstName',
      label: 'First name',
      type: 'text',
      required: true,
      placeholder: 'Enter your first name',
    },
    {
      name: 'lastName',
      label: 'Last name',
      type: 'text',
      required: true,
      placeholder: 'Enter your last name',
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'tel',
      placeholder: '+48 123 456 789',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserDataService,
    private authService: AuthService,
    private cd: ChangeDetectorRef,
    private messageService: MessageService
  ) {}

  public ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.loadUser();
  }

  public showEditForm(): void {
    this.formVisible = true;
    this.profileForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      phone: this.user.phoneNumber,
    });
  }

  public saveProfile(): void {
    if (this.profileForm.invalid) return;

    const model: UpdateUser = {
      userId: this.user.id,
      firstName: this.profileForm.value.firstName,
      lastName: this.profileForm.value.lastName,
      phoneNumber: this.profileForm.value.phone,
    };

    this.userService.updateUser(this.user.id, model).subscribe({
      next: () => {
        this.user = { ...this.user, ...model };
        this.formVisible = false;
        this.cd.markForCheck();

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Profile updated successfully',
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update profile',
        });
      },
    });
  }

  public getError(controlName: string): string {
    return CustomValidators.getErrorMessage(this.profileForm.get(controlName));
  }

  private loadUser(): void {
    this.userService.getUser(this.userId).subscribe({
      next: (res) => {
        this.user = res;
        this.initForm(res);
        this.cd.markForCheck();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load user data',
        });
      },
    });
  }

  private initForm(user: User): void {
    this.profileForm = this.fb.group({
      firstName: [
        user.firstName,
        [Validators.required, CustomValidators.noSpaces()],
      ],
      lastName: [
        user.lastName,
        [Validators.required, CustomValidators.noSpaces()],
      ],
      phone: [user.phoneNumber, [Validators.pattern(/^[0-9\-\+\s()]+$/)]],
    });
  }
}
