import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'categories',
        loadChildren: (): Promise<Type<CategoriesModule>> =>
          import('src/app/pages/admin/categories/categories.module').then(m => m.CategoriesModule)
      },
      {
        path: 'products',
        loadChildren: (): Promise<Type<ProductsModule>> =>
          import('src/app/pages/admin/products/products.module').then(m => m.ProductsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
