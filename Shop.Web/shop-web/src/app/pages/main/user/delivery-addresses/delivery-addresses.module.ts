import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DeliveryAddressesComponent } from './delivery-addresses.component';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AddressCardComponent } from 'src/app/components/address-card/address-card.component';

@NgModule({
  declarations: [DeliveryAddressesComponent],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    RadioButtonModule,
    InputTextareaModule,
    AddressCardComponent
  ],
  exports: [DeliveryAddressesComponent],
})
export class DeliveryAddressesModule {}
