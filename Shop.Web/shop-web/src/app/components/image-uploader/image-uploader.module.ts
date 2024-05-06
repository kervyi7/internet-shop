import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ImageUploaderComponent } from "./image-uploader.component";
import { ImageEditorModule } from "../image-editor/image-editor.module";
import { ButtonModule } from "primeng/button";
import { DynamicDialogModule } from "primeng/dynamicdialog";
import { Base64Pipe } from "../../pipes/image-to-base64.pipe";

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