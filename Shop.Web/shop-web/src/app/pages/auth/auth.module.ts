import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { AuthComponent } from "./auth.component";


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
  providers: [],
  exports: [
    AuthComponent
  ]
})
export class AuthModule { }
