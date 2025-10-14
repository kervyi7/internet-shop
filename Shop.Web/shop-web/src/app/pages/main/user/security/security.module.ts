import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SecurityComponent } from './security.component';

@NgModule({
  declarations: [SecurityComponent],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [SecurityComponent],
})
export class SecurityModule {}
