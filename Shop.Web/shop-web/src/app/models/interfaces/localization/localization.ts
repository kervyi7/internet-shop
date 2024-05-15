export interface ILocalization {
  buttons: IButtonsLocalization;
  headers: IHeadersLocalization;
  placeholders: IPlaceholdersLocalization;
  propertyTypes: IPropertyTypesLocalization;
  popups: IPopupsLocalization;
}

export interface IButtonsLocalization {
  save: string;
  newProduct: string;
  newCategory: string;
  categoryManagement: string;
  productManagement: string;
  addProperty: string;
  newImage: string;
  newItem: string;
  add: string;
  login: string;
}

export interface IHeadersLocalization {
  defaultValues: string;
  additionalValues: string;
  photo: string;
  categoryInformation: string;
  product: string;
  category: string;
  imageStorage: string;
  brands: string;
  types: string;
  property: string;
}

export interface IPlaceholdersLocalization {
  searchImage: string;
  propertyValue: string;
  propertyName: string;
  propertyCode: string;
  imageName: string;
  productPrice: string;
  currency: string;
  category: string;
  type: string;
  brand: string;
  isPrimary: string;
  isTitle: string;
  name: string;
  code: string;
  login: string;
  password: string;
}

export interface IPropertyTypesLocalization {
  string: string;
  number: string;
  boolean: string;
  dateTime: string;
}

export interface IPopupsLocalization {
  imageDelete: string;
  imageBoundDelete: string;
}