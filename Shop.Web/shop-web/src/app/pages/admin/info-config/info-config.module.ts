import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InfoConfigComponent } from './info-config.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { BannersComponent } from './banners/banners.component';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { ImageStorageModule } from 'src/app/components/dialogs/image-storage-dialog/image-storage-dialog.module';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { HtmlEditorComponent } from 'src/app/components/html-editor/html-editor.component';

@NgModule({
  declarations: [InfoConfigComponent, BannersComponent],
  imports: [
    CommonModule,
    RouterModule,
    HtmlEditorComponent,
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
