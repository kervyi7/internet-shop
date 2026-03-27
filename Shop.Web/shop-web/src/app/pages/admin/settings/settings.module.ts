import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SettingsRoutingModule } from './settings-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SettingsRoutingModule,
    DropdownModule,
    ButtonModule
  ],
  exports: [
    SettingsComponent
  ]
})
export class SettingsModule { }
