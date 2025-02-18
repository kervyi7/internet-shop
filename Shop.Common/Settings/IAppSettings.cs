﻿namespace Shop.Common.Settings
{
    public interface IAppSettings
    {
        string ConnectionString { get; }
        bool IsDebugMode { get; }

        IdentityConfig IdentityConfig { get; }
        AuthConfig AuthConfig { get; }
    }
}
