import { IProperty } from "../interfaces/property";

export class Property implements IProperty {
  public code: string;
  public name: string;
  public productId: number;
  public isPrimary: boolean;
  public isTitle: boolean;
  public description: string;
  public suffix: string;
  public value: propertyValue;
  public id?: number;

  constructor() {

  }
}