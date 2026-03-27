import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CustomValidators } from 'src/app/common/validators';
import { ShippingOption } from 'src/app/models/interfaces/shipping-option';
import { AdminShippingDataService } from 'src/app/services/data/admin/admin-shipping-data.service';

@Component({
  selector: 'shop-shipping-configuration',
  templateUrl: './shipping-configuration.component.html',
  styleUrls: ['./shipping-configuration.component.scss'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShippingConfigurationComponent implements OnInit {
  public shippingOptions: ShippingOption[] = [];
  public formVisible = false;
  public isEdit = false;
  public shippingForm!: FormGroup;
  public currentEditId?: number;

  constructor(
    private fb: FormBuilder,
    private shippingDataService: AdminShippingDataService,
    private cd: ChangeDetectorRef,
    private messageService: MessageService
  ) {}

  public ngOnInit(): void {
    this.loadOptions();
    this.initForm();
  }

  public loadOptions(): void {
    this.shippingDataService.getAll().subscribe({
      next: (res) => {
        this.shippingOptions = res;
        this.cd.markForCheck();
      },
    });
  }

  public showAddForm(): void {
    this.isEdit = false;
    this.formVisible = true;
    this.shippingForm.reset({ isActive: true, cost: 0 });
  }

  public showEditForm(option: ShippingOption): void {
    this.isEdit = true;
    this.formVisible = true;
    this.currentEditId = option.id;
    this.shippingForm.patchValue(option);
  }

  public save(): void {
    if (this.shippingForm.invalid) return;

    const model: ShippingOption = {
      id: this.currentEditId,
      ...this.shippingForm.value,
    };
    const obs = !this.isEdit
      ? this.shippingDataService.create(model)
      : this.shippingDataService.update(model);

    obs.subscribe({
      next: (res) => {
        if (!this.isEdit) {
          this.shippingOptions.push(res);
          this.messageService.add({
            severity: 'success',
            summary: 'Added',
            detail: 'Shipping method added successfully',
          });
        } else {
          const idx = this.shippingOptions.findIndex(
            (o) => o.id === this.currentEditId
          );
          if (idx !== -1)
            this.shippingOptions[idx] = {
              ...this.shippingOptions[idx],
              ...model,
            };
          this.messageService.add({
            severity: 'success',
            summary: 'Updated',
            detail: 'Shipping method updated successfully',
          });
        }

        this.formVisible = false;
        this.cd.markForCheck();
      },
    });
  }

  public delete(option: ShippingOption): void {
    this.shippingDataService.delete(option.id).subscribe({
      next: () => {
        this.shippingOptions = this.shippingOptions.filter(
          (o) => o.id !== option.id
        );
        this.cd.markForCheck();
        this.messageService.add({
          severity: 'info',
          summary: 'Deleted',
          detail: 'Shipping method deleted',
        });
      },
    });
  }

  public getError(controlName: string): string {
    const control = this.shippingForm.get(controlName);
    if (control?.hasError('required')) return 'This field is required';
    if (control?.hasError('min')) return 'Cost must be >= 0';
    return '';
  }

  private initForm(): void {
    this.shippingForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          CustomValidators.noSpaces(),
          CustomValidators.userNamePattern(),
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      cost: [0, [Validators.required, Validators.min(0)]],
      description: ['', [Validators.maxLength(300)]],
      isActive: [true],
    });
  }
}
