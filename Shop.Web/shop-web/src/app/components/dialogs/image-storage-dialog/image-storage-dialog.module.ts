import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { InputTextModule } from "primeng/inputtext";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { ImageStorageDialogComponent } from "./image-storage-dialog.component";
import { ImageUploaderModule } from "../../image-uploader/image-uploader.module";
import { Base64Pipe } from "../../../pipes/image-to-base64.pipe";
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from "primeng/api";

@NgModule({
  declarations: [
    ImageStorageDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ImageUploaderModule,
    Base64Pipe,
    ConfirmPopupModule
  ],
  exports: [
    ImageStorageDialogComponent
  ],
  providers: [ConfirmationService]
})
export class ImageStorageModule { }