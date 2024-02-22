namespace Shop.Common.Settings
{
    public class IdentityConfig
    {
        public bool RequireDigit { get; set; }
        public bool RequireLowercase { get; set; }
        public bool RequireUppercase { get; set; }
        public bool RequireNonAlphanumeric { get; set; }
        public int RequiredLength { get; set; }
        public bool RequireUniqueEmail { get; set; }
        public string AllowedUserNameCharacters { get; set; }
        public string UserNameRegularExpression { get; set; }
    }
}
