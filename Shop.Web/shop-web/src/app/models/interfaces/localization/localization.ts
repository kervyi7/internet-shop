export const localizationMock: ILocalization = {
  buttons: {} as IButtonsLocalization,
  headers: {} as IHeadersLocalization,
  placeholders: {} as IPlaceholdersLocalization,
  propertyTypes: {} as IPropertyTypesLocalization,
  popups: {} as IPopupsLocalization,
  notifications: {} as INotificationsLocalization
};

export interface ILocalization {
  buttons: IButtonsLocalization;
  headers: IHeadersLocalization;
  placeholders: IPlaceholdersLocalization;
  propertyTypes: IPropertyTypesLocalization;
  popups: IPopupsLocalization;
  notifications: INotificationsLocalization;
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
  imageEditor: string;
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
  productCount: string;
  productSalePrice: string;
  productDescription: string
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

export interface INotificationsLocalization {
  error: string;
  success: string;
  warn: string;
  notChanged: string;
  invalidData: string;
  changesSaved: string;
  deletedProperty: string;
  failedToLoadImage: string;
}