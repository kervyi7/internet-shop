import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MainRoutingModule,
    ButtonModule
  ],
  providers: [],
  exports: [
    MainComponent
  ]
})
export class MainModule { }
