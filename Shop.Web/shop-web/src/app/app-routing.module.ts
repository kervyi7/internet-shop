import { NgModule, Type, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminModule } from './pages/admin/admin.module';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    canActivate: [() => inject(AdminGuard).canActivate()],
    loadChildren: (): Promise<Type<AdminModule>> =>
    import('src/app/pages/admin/admin.module').then(m => m.AdminModule) 
  },
  {
    path: '',
    component: MainComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
