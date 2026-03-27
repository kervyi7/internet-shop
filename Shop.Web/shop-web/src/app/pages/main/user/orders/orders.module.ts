import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { OrdersComponent } from './orders.component';
import { OrderDetailsComponent } from 'src/app/components/order-details/order-details.component';

@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    ButtonModule,
    OrderDetailsComponent
  ],
  exports: [OrdersComponent],
})
export class OrdersModule {}
