import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { DynamicDialogModule } from "primeng/dynamicdialog";
import { FormsModule } from "@angular/forms";
import { CalendarModule } from "primeng/calendar";
import { CheckboxModule } from "primeng/checkbox";
import { InputTextModule } from "primeng/inputtext";
import { PropertyFiltersComponent } from "./property-filters.component";

@NgModule({
  declarations: [
    PropertyFiltersComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    DynamicDialogModule,
    InputTextModule,
    FormsModule,
    CalendarModule,
    CheckboxModule,
  ],
  exports: [
    PropertyFiltersComponent
  ]
})
export class PropertyFiltersModule { }