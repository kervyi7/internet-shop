import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { CreateItemDialogComponent } from "./create-item-dialog.component";

@NgModule({
  declarations: [
    CreateItemDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule
  ],
  exports: [
    CreateItemDialogComponent
  ]
})
export class SelectItemDialogModule { }