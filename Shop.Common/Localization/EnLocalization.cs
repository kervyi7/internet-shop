namespace Shop.Common.Localization
{
    public class EnLocalization : ILocalization
    {
        public IButtonsLocalization Buttons => new EnLocalizationButtons();

        public IHeadersLocalization Headers => new EnLocalizationHeaders();

        public IPlaceholdersLocalization Placeholders => new EnLocalizationPlaceholders();

        public IPropertyTypesLocalization PropertyTypes => new EnLocalizationPropertyTypes();

        public ITooltipsLocalization Tooltips => new EnLocalizationTooltips();

        public IPopupsLocalization Popups => new EnLocalizationPopups();

        public INotificationsLocalization Notifications => new EnLocalizatioNotifications();
    }

    public class EnLocalizationButtons : IButtonsLocalization
    {
        public string Save => "Save";
        public string NewProduct => "New product";
        public string NewCategory => "New category";
        public string CategoryManagement => "Category management";
        public string ProductManagement => "Product management";
        public string AddProperty => "Add property";
        public string NewImage => "New image";
        public string NewItem => "New item";
        public string Add => "Add";
        public string Login => "Login";
    }

    public class EnLocalizationHeaders : IHeadersLocalization
    {
        public string DefaultValues => "Default values";
        public string AdditionalValues => "Additional values";
        public string Photo => "Photo";
        public string CategoryInformation => "Category information";
        public string Product => "Product";
        public string Category => "Category";
        public string Brands => "Edit list of brands";
        public string Types => "Edit list of types";
        public string ImageStorage => "Image Storage";
        public string Property => "Property settings";
        public string ImageEditor => "Image Editor";
    }

    public class EnLocalizationPlaceholders : IPlaceholdersLocalization
    {
        public string SearchImage => "Search image";
        public string PropertyValue => "Property value";
        public string PropertyName => "Property name";
        public string PropertyCode => "Property code";
        public string ImageName => "Image name";
        public string ProductPrice => "Product price";
        public string Currency => "Currency";
        public string Category => "Category";
        public string Type => "Type";
        public string Brand => "Brand";
        public string IsPrimary => "Show in the list of products (isPrimary)";
        public string IsTitle => "Show in product title (isTitle)";
        public string Name => "Name";
        public string Code => "Code";
        public string Login => "Login";
        public string Password => "Password";
    }

    public class EnLocalizationPropertyTypes : IPropertyTypesLocalization
    {
        public string String => "String";
        public string Number => "Number";
        public string Boolean => "Boolean";
        public string DateTime => "DateTime";
    }

    public class EnLocalizationTooltips : ITooltipsLocalization
    {
        public string ImageName => "This name will be used when searching for an image in the Image Storage.";
    }

    public class EnLocalizationPopups : IPopupsLocalization
    {
        public string ImageDelete => "Image is not linked. Are you sure that you want to proceed?";
        public string ImageBoundDelete => "Image is linked with product(s). Are you sure that you want to proceed?";
    }

    public class EnLocalizatioNotifications : INotificationsLocalization
    {
        public string Error => "Error";
        public string Success => "Success";
        public string Warn => "Warn";
        public string NotChanged => "Changes were not detected";
        public string InvalidData => "Invalid data";
        public string ChangesSaved => "Changes were saved";
        public string DeletedProperty => "Property has deleted";
        public string FailedToLoadImage => "Failed to load image";
    }
}
