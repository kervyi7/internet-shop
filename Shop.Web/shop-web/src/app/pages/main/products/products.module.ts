
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ProductComponent } from './product/product.component';
import { PropertiesListModule } from '../../../components/properties-list/properties-list.module';
import { ButtonModule } from 'primeng/button';
import { PropertyFiltersModule } from '../../../components/property-filters/property-filters.module';
import { PaginatorModule } from 'primeng/paginator';
import { GalleriaModule } from 'primeng/galleria';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ProductsRoutingModule,
    BreadcrumbModule,
    PropertiesListModule,
    ButtonModule,
    PropertyFiltersModule,
    PaginatorModule,
    GalleriaModule
  ],
  providers: [DialogService],
  exports: [
    ProductsComponent
  ]
})
export class ProductsModule { }
