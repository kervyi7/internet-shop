import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CategoriesModule } from './categories/categories.module';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'categories',
        loadChildren: (): Promise<Type<CategoriesModule>> =>
          import('src/app/pages/admin/categories/categories.module').then(m => m.CategoriesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
