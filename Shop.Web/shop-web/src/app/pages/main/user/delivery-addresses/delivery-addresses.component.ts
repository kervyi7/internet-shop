import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CustomValidators } from 'src/app/common/validators';
import { DeliveryAddress } from 'src/app/models/interfaces/delivery-address';
import { AuthService } from 'src/app/services/auth.service';
import { DeliveryAddressDataService } from 'src/app/services/data/delivery-address-data.service';

@Component({
  selector: 'app-delivery-addresses',
  templateUrl: './delivery-addresses.component.html',
  styleUrls: ['./delivery-addresses.component.scss'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeliveryAddressesComponent implements OnInit {
  public addressFields = [
    {
      name: 'firstName',
      label: 'First name',
      type: 'text',
      required: true,
      placeholder: 'Enter first name',
    },
    {
      name: 'lastName',
      label: 'Last name',
      type: 'text',
      required: true,
      placeholder: 'Enter last name',
    },
    {
      name: 'country',
      label: 'Country',
      type: 'text',
      required: true,
      placeholder: 'Country',
    },
    {
      name: 'city',
      label: 'City',
      type: 'text',
      required: true,
      placeholder: 'City',
    },
    {
      name: 'street',
      label: 'Street',
      type: 'text',
      required: true,
      placeholder: 'Street name',
    },
    {
      name: 'houseNumber',
      label: 'House №',
      type: 'text',
      required: true,
      placeholder: 'House number',
    },
    {
      name: 'apartment',
      label: 'Apartment',
      type: 'text',
      required: false,
      placeholder: 'Apt, suite (optional)',
    },
    {
      name: 'postcode',
      label: 'Postcode',
      type: 'text',
      required: true,
      placeholder: 'Postal code',
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'tel',
      required: true,
      placeholder: '+48 123 456 789',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      placeholder: 'name@example.com',
    },
  ];

  public addresses: DeliveryAddress[] = [];
  public selectedDefaultId?: number;
  public userId = 'test-user';

  public formVisible = false;
  public isEdit = false;
  public addressForm!: FormGroup;
  public currentEditId?: number;

  constructor(
    private fb: FormBuilder,
    private dataService: DeliveryAddressDataService,
    private authService: AuthService,
    private cd: ChangeDetectorRef,
    private messageService: MessageService
  ) {}

  public ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.loadAddresses();
    this.initForm();
  }

  public loadAddresses(): void {
    this.dataService.getAll(this.userId).subscribe({
      next: (res) => {
        this.addresses = res.sort(
          (a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0)
        );
        this.selectedDefaultId = this.addresses.find((a) => a.isDefault)?.id;
        this.cd.markForCheck();
      },
    });
  }

  public initForm(): void {
    this.addressForm = this.fb.group({
      firstName: ['', [Validators.required, CustomValidators.noSpaces()]],
      lastName: ['', [Validators.required, CustomValidators.noSpaces()]],
      country: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      houseNumber: ['', Validators.required],
      apartment: [''],
      postcode: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      isDefault: [false],
      notes: [''],
    });
  }

  public showAddForm(): void {
    this.isEdit = false;
    this.formVisible = true;
    this.addressForm.reset({ isDefault: false });
  }

  public showEditForm(address: DeliveryAddress): void {
    this.isEdit = true;
    this.formVisible = true;
    this.currentEditId = address.id;
    this.addressForm.patchValue(address);
  }

  public saveAddress(): void {
    if (this.addressForm.invalid) return;

    const model: DeliveryAddress = {
      ...this.addressForm.value,
      userId: this.userId,
    };

    if (!this.isEdit) {
      this.dataService.add(model).subscribe({
        next: (created) => {
          this.addresses.push(created);
          this.sortAddresses();
          this.formVisible = false;
          this.cd.markForCheck();
          this.messageService.add({
            severity: 'success',
            summary: 'Added',
            detail: 'Address added successfully',
          });
        },
      });
    } else {
      this.dataService.update(this.currentEditId!, model).subscribe({
        next: () => {
          const index = this.addresses.findIndex(
            (a) => a.id === this.currentEditId
          );
          if (index !== -1) {
            this.addresses[index] = { ...this.addresses[index], ...model };
          }
          this.sortAddresses();
          this.formVisible = false;
          this.cd.markForCheck();
          this.messageService.add({
            severity: 'success',
            summary: 'Updated',
            detail: 'Address updated successfully',
          });
        },
      });
    }
  }

  public deleteAddress(address: DeliveryAddress): void {
    this.dataService.delete(address.id, this.userId).subscribe({
      next: () => {
        this.addresses = this.addresses.filter((a) => a.id !== address.id);
        this.cd.markForCheck();
        this.messageService.add({
          severity: 'info',
          summary: 'Deleted',
          detail: 'Address deleted',
        });
      },
    });
  }

  public changeDefault(address: DeliveryAddress): void {
    if (address.isDefault) {
      return;
    }
    this.addresses.forEach((a) => (a.isDefault = a.id === address.id));
    this.selectedDefaultId = address.id;
    this.sortAddresses();
    this.cd.markForCheck();
    this.dataService
      .update(address.id!, { ...address, isDefault: true, userId: this.userId })
      .subscribe();
  }

  public getError(controlName: string): string {
    return CustomValidators.getErrorMessage(this.addressForm.get(controlName));
  }

  private sortAddresses(): void {
    this.addresses.sort((a, b) =>
      a.isDefault === b.isDefault ? 0 : a.isDefault ? -1 : 1
    );
  }
}
