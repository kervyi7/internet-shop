import { SortingType } from "../enums/sorting-types";

export interface IGetModelsRequest {
  skip: number;
  count: number;
  searchValue?: string;
  sortBy?: SortingType;
}
