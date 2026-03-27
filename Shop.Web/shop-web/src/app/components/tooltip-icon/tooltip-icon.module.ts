import { NgModule } from "@angular/core";
import { TooltipIconComponent } from "./tooltip-icon.component";
import { TooltipModule } from "primeng/tooltip";

@NgModule({
  declarations: [
    TooltipIconComponent,
  ],
  imports: [
    TooltipModule
  ],
  exports: [
    TooltipIconComponent
  ]
})
export class TooltipIconModule { }