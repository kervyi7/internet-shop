import { PropertyTypes } from "../models/enums/property-types";
import { IProperty } from "../models/interfaces/property";

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
}