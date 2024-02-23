import { NgModule, Type, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './pages/admin/admin.module';
import { AdminGuard } from './guards/admin.guard';
import { MainModule } from './pages/main/main.module';
import { LoginModule } from 'src/app/pages/login/login.module';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: (): Promise<Type<LoginModule>> =>
    import('src/app/pages/login/login.module').then(m => m.LoginModule) 
  },
  {
    path: 'admin',
    canActivate: [() => inject(AdminGuard).canActivate()],
    loadChildren: (): Promise<Type<AdminModule>> =>
    import('src/app/pages/admin/admin.module').then(m => m.AdminModule) 
  },
  {
    path: '',
    loadChildren: (): Promise<Type<MainModule>> =>
    import('src/app/pages/main/main.module').then(m => m.MainModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
