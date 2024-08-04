import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { ProductsModule } from './products/products.module';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product/product.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: ':category',
    loadChildren: (): Promise<Type<ProductsModule>> =>
          import('src/app/pages/main/products/products.module').then(m => m.ProductsModule)
  },
  {
    path: ':category/:code',
    component: ProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
