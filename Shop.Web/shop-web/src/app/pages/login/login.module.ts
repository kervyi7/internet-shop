import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { DefInputModule } from '../../components/form-fields/def-input/def-input.module';
import { DefButtonModule } from '../../components/def-button/def-button.module';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DefInputModule,
    DefButtonModule,
    ReactiveFormsModule,
    LoginRoutingModule
  ],
  providers: [],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
