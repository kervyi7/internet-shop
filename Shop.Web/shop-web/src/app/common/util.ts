import { DialogService, DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { Type } from "@angular/core";

export class Util {
  public static isDataEqual<T>(data1: T, data2: T): boolean {
    return JSON.stringify(data1) === JSON.stringify(data2);
  }

  public static openDialog<T>(service: DialogService, component: Type<T>, config: DynamicDialogConfig): DynamicDialogRef {
    return service.open(component, {
      data: config.data,
      header: config.header,
      width: config.width,
      maximizable: config.maximizable,
      contentStyle: { overflow: 'visible' }
    });
  }
}