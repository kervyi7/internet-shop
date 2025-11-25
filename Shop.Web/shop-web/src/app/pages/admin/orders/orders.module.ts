import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { OrderDetailsComponent } from 'src/app/components/order-details/order-details.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationFiltersComponent } from 'src/app/components/pagination-filters/pagination-filters.component';
import { StateSwitcherModule } from 'src/app/components/state-switcher/state-switcher.module';

@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    DropdownModule,
    PaginatorModule,
    OrderDetailsComponent,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    PaginatorModule,
    PaginationFiltersComponent,
    StateSwitcherModule
  ],
  exports: [OrdersComponent],
})
export class AdminOrdersModule {}
