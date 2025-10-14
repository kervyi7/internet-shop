
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
import { FiltersListComponent } from 'src/app/components/filters-list/filters-list.component';
import { ProductContainerComponent } from 'src/app/components/product-container/product-container.component';

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
    GalleriaModule,
    FiltersListComponent,
    ProductContainerComponent
  ],
  providers: [DialogService],
  exports: [
    ProductsComponent
  ]
})
export class ProductsModule { }
