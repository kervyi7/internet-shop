export const localizationMock: ILocalization = {
  buttons: {} as IButtonsLocalization,
  headers: {} as IHeadersLocalization,
  placeholders: {} as IPlaceholdersLocalization,
  propertyTypes: {} as IPropertyTypesLocalization,
  popups: {} as IPopupsLocalization,
  notifications: {} as INotificationsLocalization,
  warnings: {} as IWarningsLocalization,
  boolProperties: {} as IBoolPropertiesLocalization,
  tooltips: {} as ITooltipsLocalization,
};

export interface ILocalization {
  buttons: IButtonsLocalization;
  headers: IHeadersLocalization;
  placeholders: IPlaceholdersLocalization;
  propertyTypes: IPropertyTypesLocalization;
  popups: IPopupsLocalization;
  notifications: INotificationsLocalization;
  warnings: IWarningsLocalization;
  boolProperties: IBoolPropertiesLocalization;
  tooltips: ITooltipsLocalization;
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
  createTemplate: string;
  settings: string;
}

export interface IHeadersLocalization {
  defaultValues: string;
  additionalValues: string;
  image: string;
  mainImage: string;
  secondaryImages: string;
  categoryInformation: string;
  product: string;
  category: string;
  brands: string;
  types: string;
  imageStorage: string;
  property: string;
  imageEditor: string;
  signIn: string;
}

export interface IWarningsLocalization {
  emptyCategoriesList: string;
  emptyProductsList: string;
  templateIsMissing: string;
  titleImageIsMissing: string;
  imageIsMissing: string;
  categoryIsIncomplete: string;
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
  productDiscountPrice: string;
  productDescription: string;
  properties: string;
}

export interface IPropertyTypesLocalization {
  string: string;
  number: string;
  boolean: string;
  dateTime: string;
}

export interface IBoolPropertiesLocalization {
  yes: string;
  no: string;
}

export interface ITooltipsLocalization {
  imageName: string;
  categoryWarn: string;
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