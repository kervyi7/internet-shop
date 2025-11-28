import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InfoConfigComponent } from './info-config.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { EditorModule } from 'primeng/editor';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { BannersComponent } from './banners/banners.component';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { ImageStorageModule } from 'src/app/components/dialogs/image-storage-dialog/image-storage-dialog.module';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [InfoConfigComponent, BannersComponent],
  imports: [
    CommonModule,
    RouterModule,
    EditorModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    AccordionModule,
    InputTextModule,
    CheckboxModule,
    DialogModule,
    ImageStorageModule,
    InputTextareaModule,
    DynamicDialogModule,
  ],
  exports: [InfoConfigComponent],
  providers: [DialogService]
})
export class InfoConfigModule {}
