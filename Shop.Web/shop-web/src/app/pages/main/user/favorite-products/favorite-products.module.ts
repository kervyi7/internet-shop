import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FavoriteProductsComponent } from './favorite-products.component';
import { ButtonModule } from 'primeng/button';
import { ProductContainerComponent } from 'src/app/components/product-container/product-container.component';
import { StateSwitcherModule } from 'src/app/components/state-switcher/state-switcher.module';

@NgModule({
  declarations: [FavoriteProductsComponent],
  imports: [CommonModule, RouterModule, ButtonModule, ProductContainerComponent, StateSwitcherModule],
  exports: [FavoriteProductsComponent],
})
export class FavoriteProductsModule {}
