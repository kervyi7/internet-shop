import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { SelectItemDialogModule } from '../../../components/dialogs/create-item-dialog/create-item-dialog.module';
import { ToastModule } from 'primeng/toast';
import { ImageUploaderModule } from '../../../components/image-uploader/image-uploader.module';
import { ImageStorageModule } from '../../../components/dialogs/image-storage-dialog/image-storage-dialog.module';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PropertiesListModule } from '../../../components/properties-list/properties-list.module';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    CalendarModule,
    InputTextareaModule,
    PropertiesListModule,
    TableModule,
    TooltipModule,
    ConfirmDialogModule
  ],
  providers: [DialogService, ConfirmationService],
  exports: [
    ProductsComponent
  ]
})
export class ProductsModule { }
