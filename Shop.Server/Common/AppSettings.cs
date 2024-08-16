using Microsoft.Extensions.Configuration;
using Shop.Common.Settings;

namespace Shop.Server.Common
{
    public class AppSettings : IAppSettings
    {
        private const string DefaultConnectionKey = "DefaultConnection";
        private readonly IConfiguration _configuration;

        public AppSettings(IConfiguration configuration)
        {
            _configuration = configuration;
            Load();
        }

        public string ConnectionString { get; private set; }
        public bool IsDebugMode { get; private set; }
        public IdentityConfig IdentityConfig { get; private set; }
        public AuthConfig AuthConfig { get; private set; }

        private void Load()
        {
            ConnectionString = _configuration.GetConnectionString(DefaultConnectionKey);
            IdentityConfig = _configuration.GetSection(nameof(IdentityConfig)).Get<IdentityConfig>();
            AuthConfig = _configuration.GetSection(nameof(AuthConfig)).Get<AuthConfig>();
            Verification(DefaultConnectionKey, ConnectionString);
            //SqlProvider = GetSettinByKey<string>(nameof(SqlProvider));
        }

        private void Verification(string key, string value)
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                //throw new AppSettingException($"setting by key: '{key}' is null or white space");
            }
        }

        private T GetSettinBySection<T>(string section) where T : class
        {
            var setting = _configuration.GetSection(section).Get<T>();

            return setting;
        }
    }
}
