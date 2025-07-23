import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { ButtonModule } from 'primeng/button';
import { HomeComponent } from './home/home.component';
import { CarouselModule } from 'primeng/carousel';
import { DialogService } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MainRoutingModule,
    ButtonModule,
    CarouselModule,
  ],
  providers: [DialogService],
  exports: [
    MainComponent
  ]
})
export class MainModule { }
