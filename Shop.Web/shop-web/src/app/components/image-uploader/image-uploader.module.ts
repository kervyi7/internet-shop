import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ImageUploaderComponent } from "./image-uploader.component";
import { ImageEditorModule } from "../image-editor/image-editor.module";
import { ButtonModule } from "primeng/button";
import { DynamicDialogModule } from "primeng/dynamicdialog";

@NgModule({
  declarations: [
    ImageUploaderComponent,
  ],
  imports: [
    CommonModule,
    ImageEditorModule,
    ButtonModule,
    DynamicDialogModule
  ],
  exports: [
    ImageUploaderComponent
  ]
})
export class ImageUploaderModule { }