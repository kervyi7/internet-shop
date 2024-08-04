import { DialogService, DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { PropertyTypes } from "../models/enums/property-types";
import { IProperty } from "../models/interfaces/property";
import { Type } from "@angular/core";

export class Util {
  public static getPropertyType(property: IProperty): PropertyTypes {
    switch (typeof property.value) {
      case 'string':
        return PropertyTypes.string;
      case 'number':
        return PropertyTypes.number;
      case 'boolean':
        return PropertyTypes.bool;
      case 'object':
        return PropertyTypes.date;
      default: throw new Error(`unknown type by value '${property.value}'`);
    }
  }

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