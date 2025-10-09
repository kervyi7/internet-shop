import { PropertyTypes } from '../enums/property-types';
import { IGetModelsRequest } from './get-models-request';

export interface PropertyFilter {
  name: string;
  type: PropertyTypes;
  values: string[];
}

export interface CategoryFiltersResponse {
  properties: PropertyFilter[];
  brands: { id: number; name: string }[];
  types: { id: number; name: string }[];
  minPrice: number;
  maxPrice: number;
}

export interface ProductFilters {
  properties: PropertyFilter[];
  brandIds: number[];
  typeIds: number[];
  priceFrom: number;
  priceTo: number;
}

export interface ProductRequest extends IGetModelsRequest, ProductFilters {}

export type RangeValue = [number, number];

export interface LabelValueModel {
  label: string;
  value: string
}
