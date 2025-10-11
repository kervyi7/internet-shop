import { NgModule, Type, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './pages/admin/admin.module';
import { AdminGuard } from './guards/admin.guard';
import { MainModule } from './pages/main/main.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UserGuard } from './guards/user.guard';
import { UserModule } from './pages/user/user.module';
import { AuthComponent } from './pages/auth/auth.component';

const routes: Routes = [
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: 'sign-up',
    component: AuthComponent
  },
  {
    path: 'admin',
    runGuardsAndResolvers: 'always',
    canActivate: [() => inject(AdminGuard).canActivate()],
    loadChildren: (): Promise<Type<AdminModule>> =>
      import('src/app/pages/admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: 'user',
    runGuardsAndResolvers: 'always',
    canActivate: [() => inject(UserGuard).canActivate()],
    loadChildren: (): Promise<Type<UserModule>> =>
      import('src/app/pages/user/user.module').then(m => m.UserModule),
  },
  {
    path: '',
    loadChildren: (): Promise<Type<MainModule>> =>
      import('src/app/pages/main/main.module').then(m => m.MainModule),
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
