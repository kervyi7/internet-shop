import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DefButtonComponent } from "./def-button.component";


@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		DefButtonComponent
	],
	exports: [
		DefButtonComponent
	]
})
export class DefButtonModule { }