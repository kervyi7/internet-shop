import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InfoConfigComponent } from './info-config.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { EditorModule } from 'primeng/editor';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [InfoConfigComponent],
  imports: [
    CommonModule,
    RouterModule,
    EditorModule,
    FormsModule,
    ButtonModule,
    AccordionModule
  ],
  exports: [InfoConfigComponent],
})
export class InfoConfigModule {}
