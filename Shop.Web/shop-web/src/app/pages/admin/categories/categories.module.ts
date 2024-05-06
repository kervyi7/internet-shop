import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryComponent } from './category/category.component';
import { ImageStorageModule } from '../../../components/dialogs/image-storage-dialog/image-storage-dialog.module';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ImageUploaderModule } from '../../../components/image-uploader/image-uploader.module';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Base64Pipe } from '../../../pipes/image-to-base64.pipe';

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CategoriesRoutingModule,
    ImageStorageModule,
    DynamicDialogModule,
    ImageUploaderModule,
    ButtonModule,
    InputTextModule,
    Base64Pipe
  ],
  providers: [DialogService],
  exports: [
    CategoriesComponent
  ]
})
export class CategoriesModule { }
