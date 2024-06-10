using System.Diagnostics;

namespace Shop.Common.Localization
{
    public class PlLocalization : ILocalization
    {
        public IButtonsLocalization Buttons => new PlLocalizationButtons();

        public IHeadersLocalization Headers => new PlLocalizationHeaders();

        public IPlaceholdersLocalization Placeholders => new PlLocalizationPlaceholders();

        public IPropertyTypesLocalization PropertyTypes => new PlLocalizationPropertyTypes();

        public ITooltipsLocalization Tooltips => new PlLocalizationTooltips();

        public IPopupsLocalization Popups => new PlLocalizationPopups();

        public INotificationsLocalization Notifications => new PlLocalizatioNotifications();
    }

    public class PlLocalizationButtons : IButtonsLocalization
    {
        public string Save => "Save";
        public string NewProduct => "New product";
        public string NewCategory => "New category";
        public string CategoryManagement => "Category management pl";
        public string ProductManagement => "Product management pl";
        public string AddProperty => "Add property";
        public string NewImage => "New image";
        public string NewItem => "New item";
        public string Add => "Add";
        public string Login => "Login";
    }

    public class PlLocalizationHeaders : IHeadersLocalization
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

    public class PlLocalizationPlaceholders : IPlaceholdersLocalization
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

    public class PlLocalizationPropertyTypes : IPropertyTypesLocalization
    {
        public string String => "String";
        public string Number => "Number";
        public string Boolean => "Boolean";
        public string DateTime => "DateTime";
    }


    public class PlLocalizationTooltips : ITooltipsLocalization
    {
        public string ImageName => "This name will be used when searching for an image in the Image Storage.";
    }

    public class PlLocalizationPopups : IPopupsLocalization
    {
        public string ImageDelete => "Image is not linked. Are you sure that you want to proceed?";
        public string ImageBoundDelete => "Image is linked with product(s). Are you sure that you want to proceed?";
    }

    public class PlLocalizatioNotifications : INotificationsLocalization
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
