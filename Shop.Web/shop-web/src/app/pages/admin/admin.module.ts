import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { ShippingConfigurationModule } from './shipping-configuration/shipping-configuration.module';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    ShippingConfigurationModule,
  ],
  exports: [AdminComponent],
})
export class AdminModule {}
