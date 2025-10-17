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
import { StateSwitcherModule } from 'src/app/components/state-switcher/state-switcher.module';
import { ProductWidgetComponent } from 'src/app/components/product-widget/product-widget.component';
import { InfoModule } from './info/info.module';
import { ProductSectionsComponent } from 'src/app/components/product-sections/product-sections.component';

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
    StateSwitcherModule,
    ProductWidgetComponent,
    ProductSectionsComponent,
    InfoModule
  ],
  providers: [DialogService],
  exports: [
    MainComponent
  ]
})
export class MainModule { }
