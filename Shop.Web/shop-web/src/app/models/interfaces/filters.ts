import { OrderStatuses } from '../enums/order-statuses';
import { PropertyTypes } from '../enums/property-types';
import { SortingType } from '../enums/sorting-types';
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
  value: string | number;
}

export interface OrderFilters {
  status: OrderStatuses;
}

export interface OrderRequest extends IGetModelsRequest, OrderFilters {}

export const sortByForProducts: LabelValueModel[] = [
  { label: 'Price: High to Low', value: SortingType.price_desc },
  { label: 'Price: Low to High', value: SortingType.price_asc },
  { label: 'Date: Oldest First', value: SortingType.date_asc },
  { label: 'Date: Newest First', value: SortingType.date_desc },
];

export const sortByForOrders: LabelValueModel[] = [
  { label: 'Pending', value: OrderStatuses.Pending },
  { label: 'Paid', value: OrderStatuses.Paid },
  { label: 'Payment cancelled', value: OrderStatuses.PaymentCancelled },
  { label: 'Processing', value: OrderStatuses.Processing },
  { label: 'Shipped', value: OrderStatuses.Shipped },
  { label: 'Delivered', value: OrderStatuses.Delivered },
  { label: 'Cancelled', value: OrderStatuses.Cancelled },
  { label: 'Expired', value: OrderStatuses.Expired },
];
