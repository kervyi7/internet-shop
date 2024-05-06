import { Injectable } from "@angular/core";
import { MessageTypes } from "../models/enums/message-types";
import { MessageService } from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private _messageService: MessageService) {
  }

  public showMessage(type: MessageTypes, summary: string, detail: string) {
    this._messageService.add({ severity: type, summary: summary, detail: detail });
  }
}