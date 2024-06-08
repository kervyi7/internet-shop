namespace Shop.Common.Localization
{
    public interface ILocalization
    {
        IButtonsLocalization Buttons { get; }
        IHeadersLocalization Headers { get; }
        IPlaceholdersLocalization Placeholders { get; }
        IPropertyTypesLocalization PropertyTypes { get; }
        IPopupsLocalization Popups { get; }
        INotificationsLocalization Notifications { get; }
    }

    public interface IButtonsLocalization
    {
        string Save { get; }
        string NewProduct { get; }
        string NewCategory { get; }
        string CategoryManagement { get; }
        string ProductManagement { get; }
        string AddProperty { get; }
        string NewImage { get; }
        string NewItem { get; }
        string Add { get; }
        string Login { get; }
    }

    public interface IHeadersLocalization
    {
        string DefaultValues { get; }
        string AdditionalValues { get; }
        string Photo { get; }
        string CategoryInformation { get; }
        string Product { get; }
        string Category { get; }
        string Brands { get; }
        string Types { get; }
        string ImageStorage { get; }
        string Property { get; }
        string ImageEditor { get; }
    }

    public interface IPlaceholdersLocalization
    {
        string SearchImage { get; }
        string PropertyValue { get; }
        string PropertyName { get; }
        string PropertyCode { get; }
        string ImageName { get; }
        string Name { get; }
        string Code { get; }
        string ProductPrice { get; }
        string Currency { get; }
        string Category { get; }
        string Type { get; }
        string Brand { get; }
        string IsPrimary { get; }
        string IsTitle { get; }
        string Login { get; }
        string Password { get; }
    }

    public interface IPropertyTypesLocalization
    {
        string String { get; }
        string Number { get; }
        string Boolean { get; }
        string DateTime { get; }
    }

    public interface ITooltipsLocalization
    {
        string ImageName { get; }
    }

    public interface IPopupsLocalization
    {
        string ImageDelete { get; }
        string ImageBoundDelete { get; }
    }

    public interface INotificationsLocalization
    {
        string Error { get; }
        string Success { get; }
        string Warn { get; }
        string NotChanged { get; }
        string InvalidData { get; }
        string ChangesSaved { get; }
        string DeletedProperty { get; }
        string FailedToLoadImage { get; }
    }
}
