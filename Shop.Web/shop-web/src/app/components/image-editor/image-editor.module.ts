import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ImageEditorComponent } from "./image-editor.component";
import { ImageCropperModule } from "ngx-image-cropper";
import { InputTextModule } from "primeng/inputtext";
import { FormsModule } from "@angular/forms";
import { TooltipModule } from "primeng/tooltip";
import { ButtonModule } from "primeng/button";

@NgModule({
  declarations: [
    ImageEditorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ImageCropperModule,
    InputTextModule,
    TooltipModule,
    ButtonModule
  ],
  exports: [
    ImageEditorComponent
  ]
})
export class ImageEditorModule { }