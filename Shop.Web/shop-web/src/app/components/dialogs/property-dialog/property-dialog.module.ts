import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PropertyDialogComponent } from "./property-dialog.component";
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from "@angular/forms";
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";

@NgModule({
  declarations: [
    PropertyDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RadioButtonModule,
    CheckboxModule,
    CalendarModule,
    InputTextModule,
    ButtonModule
  ],
  exports: [
    PropertyDialogComponent
  ]
})
export class PropertyDialogModule { }