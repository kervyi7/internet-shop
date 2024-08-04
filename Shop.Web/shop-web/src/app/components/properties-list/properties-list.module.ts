import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { DynamicDialogModule } from "primeng/dynamicdialog";
import { PropertiesListComponent } from "./properties-list.component";
import { FormsModule } from "@angular/forms";
import { CalendarModule } from "primeng/calendar";
import { CheckboxModule } from "primeng/checkbox";
import { InputTextModule } from "primeng/inputtext";
import { Base64Pipe } from "../../pipes/image-to-base64.pipe";

@NgModule({
  declarations: [
    PropertiesListComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    DynamicDialogModule,
    InputTextModule,
    FormsModule,
    Base64Pipe,
    CalendarModule,
    CheckboxModule,
  ],
  exports: [
    PropertiesListComponent
  ]
})
export class PropertiesListModule { }