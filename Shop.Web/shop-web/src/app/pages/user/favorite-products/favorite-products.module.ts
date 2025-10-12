import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FavoriteProductsComponent } from './favorite-products.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [FavoriteProductsComponent],
  imports: [CommonModule, RouterModule, ButtonModule],
  exports: [FavoriteProductsComponent],
})
export class FavoriteProductsModule {}
