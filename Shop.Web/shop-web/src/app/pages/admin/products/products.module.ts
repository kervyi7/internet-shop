import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductComponent } from './product/product.component';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PropertyDialogModule } from '../../../components/dialogs/property-dialog/property-dialog.module';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectItemDialogModule } from '../../../components/dialogs/select-item-dialog/select-item-dialog.module';
import { ToastModule } from 'primeng/toast';
import { NotificationService } from '../../../services/notification.service';
import { ImageUploaderModule } from '../../../components/image-uploader/image-uploader.module';
import { ImageStorageModule } from '../../../components/dialogs/image-storage-dialog/image-storage-dialog.module';
import { Base64Pipe } from '../../../pipes/image-to-base64.pipe';
import { CalendarModule } from 'primeng/calendar';

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
    SelectItemDialogModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    PropertyDialogModule,
    DynamicDialogModule,
    CheckboxModule,
    ToastModule,
    ImageUploaderModule,
    ImageStorageModule,
    Base64Pipe,
    CalendarModule
  ],
  providers: [DialogService, NotificationService],
  exports: [
    ProductsComponent
  ]
})
export class ProductsModule { }
