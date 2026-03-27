import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryComponent } from './category/category.component';
import { ImageStorageModule } from '../../../components/dialogs/image-storage-dialog/image-storage-dialog.module';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ImageUploaderModule } from '../../../components/image-uploader/image-uploader.module';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { PropertiesListModule } from '../../../components/properties-list/properties-list.module';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { TooltipIconModule } from '../../../components/tooltip-icon/tooltip-icon.module';
import { PaginationFiltersComponent } from 'src/app/components/pagination-filters/pagination-filters.component';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CategoriesRoutingModule,
    ImageStorageModule,
    DynamicDialogModule,
    ImageUploaderModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    CheckboxModule,
    DropdownModule,
    PropertiesListModule,
    ToastModule,
    TableModule,
    TooltipModule,
    TooltipIconModule,
    PaginationFiltersComponent,
    PaginatorModule
  ],
  providers: [DialogService],
  exports: [
    CategoriesComponent
  ]
})
export class CategoriesModule { }
