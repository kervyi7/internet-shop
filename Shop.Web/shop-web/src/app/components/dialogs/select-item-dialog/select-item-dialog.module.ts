import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { SelectItemDialogComponent } from "./select-item-dialog.component";

@NgModule({
  declarations: [
    SelectItemDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule
  ],
  exports: [
    SelectItemDialogComponent
  ]
})
export class SelectItemDialogModule { }