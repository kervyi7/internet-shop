import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DefInputComponent } from "./def-input.component";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    DefInputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    DefInputComponent
  ]
})
export class DefInputModule { }