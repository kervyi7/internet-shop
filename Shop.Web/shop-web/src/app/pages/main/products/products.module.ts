
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { NotificationService } from '../../../services/notification.service';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ProductsRoutingModule,
    BreadcrumbModule 
  ],
  providers: [DialogService, NotificationService],
  exports: [
    ProductsComponent
  ]
})
export class ProductsModule { }
