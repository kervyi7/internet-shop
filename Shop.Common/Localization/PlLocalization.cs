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

        public INotificationsLocalization Notifications => new PlLocalizationNotifications();

        public IWarningsLocalization Warnings => new PlLocalizationWarnings();

        public IBoolPropertiesLocalization BoolProperties => new PlLocalizationBoolProperties();
    }

    public class PlLocalizationButtons : IButtonsLocalization
    {
        public string Save => "Zapisz";
        public string NewProduct => "Nowy produkt";
        public string NewCategory => "Nowa kategoria";
        public string CategoryManagement => "Zarządzanie kategoriami";
        public string ProductManagement => "Zarządzanie produktami";
        public string AddProperty => "Dodaj właściwość";
        public string NewImage => "Nowy obraz";
        public string NewItem => "Nowa pozycja";
        public string Add => "Dodaj";
        public string Login => "Zaloguj się";
        public string CreateTemplate => "Utwórz szablon";
        public string Settings => "Ustawienia";
    }

    public class PlLocalizationHeaders : IHeadersLocalization
    {
        public string DefaultValues => "Wartości domyślne";
        public string AdditionalValues => "Wartości dodatkowe";
        public string Image => "Obraz";
        public string MainImage => "Główny obraz";
        public string SecondaryImages => "Obrazy dodatkowe";
        public string CategoryInformation => "Informacje o kategorii";
        public string Product => "Produkt";
        public string Category => "Kategoria";
        public string Brands => "Dodaj markę";
        public string Types => "Dodaj typ";
        public string ImageStorage => "Magazyn obrazów";
        public string Property => "Ustawienia właściwości";
        public string ImageEditor => "Edytor obrazów";
        public string SignIn => "Zaloguj się";
    }

    public class PlLocalizationWarnings : IWarningsLocalization
    {
        public string EmptyCategoriesList => "Brak kategorii";
        public string EmptyProductsList => "Brak produktów";
        public string TemplateIsMissing => "Brak szablonu!";
        public string TitleImageIsMissing => "Brak obrazu tytułowego!";
        public string ImageIsMissing => "Brak obrazu!";
        public string CategoryIsIncomplete => "Twoja kategoria jest niekompletna.";
    }

    public class PlLocalizationPlaceholders : IPlaceholdersLocalization
    {
        public string SearchImage => "Wyszukaj obraz";
        public string PropertyValue => "Wartość właściwości";
        public string PropertyName => "Nazwa właściwości";
        public string PropertyCode => "Kod właściwości";
        public string ImageName => "Nazwa obrazu";
        public string ProductPrice => "Cena produktu";
        public string Currency => "Waluta";
        public string Category => "Kategoria";
        public string Type => "Typ";
        public string Brand => "Marka";
        public string IsPrimary => "Pokaż na liście produktów (isPrimary)";
        public string IsTitle => "Pokaż w tytule produktu (isTitle)";
        public string Name => "Nazwa";
        public string Code => "Kod";
        public string Login => "Login";
        public string Password => "Hasło";
        public string ProductCount => "Liczba produktów";
        public string ProductDiscountPrice => "Cena promocyjna";
        public string ProductDescription => "Opis";
        public string Properties => "Właściwości";
    }

    public class PlLocalizationPropertyTypes : IPropertyTypesLocalization
    {
        public string String => "Ciąg";
        public string Number => "Liczba";
        public string Boolean => "Logiczny";
        public string DateTime => "Data i czas";
    }

    public class PlLocalizationBoolProperties : IBoolPropertiesLocalization
    {
        public string Yes => "Tak";
        public string No => "Nie";
    }

    public class PlLocalizationTooltips : ITooltipsLocalization
    {
        public string ImageName => "Ta nazwa będzie używana do wyszukiwania obrazu w Magazynie Obrazów.";
        public string CategoryWarn => "Proszę uzupełnić wymagane pola, w przeciwnym razie kategoria nie będzie widoczna dla użytkowników!";
    }

    public class PlLocalizationPopups : IPopupsLocalization
    {
        public string ImageDelete => "Obraz nie jest powiązany. Czy na pewno chcesz kontynuować?";
        public string ImageBoundDelete => "Obraz jest powiązany z produktami. Czy na pewno chcesz kontynuować?";
    }

    public class PlLocalizationNotifications : INotificationsLocalization
    {
        public string Error => "Błąd";
        public string Success => "Sukces";
        public string Warn => "Ostrzeżenie";
        public string NotChanged => "Nie wykryto zmian";
        public string InvalidData => "Nieprawidłowe dane";
        public string ChangesSaved => "Zmiany zostały zapisane";
        public string DeletedProperty => "Właściwość została usunięta";
        public string FailedToLoadImage => "Nie udało się załadować obrazu";
    }

}
