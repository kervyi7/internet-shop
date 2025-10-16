import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InfoConfigComponent } from './info-config.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { EditorModule } from 'primeng/editor';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [InfoConfigComponent],
  imports: [
    CommonModule,
    RouterModule,
    EditorModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    AccordionModule,
    InputTextModule
  ],
  exports: [InfoConfigComponent],
})
export class InfoConfigModule {}
