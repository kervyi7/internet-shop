using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;
using System;

namespace Shop.Server.Auth
{
    public class AuthOptions
    {
        private const string Key = "1NGjtLG9xr95o/0w3HRPhQZLKkB5g0bvAtkIyhrbh+oaWkYj3HnsgyWOtPzEsmtGz74eA3jfZa4sOKR3HxHJFQ==";
        private const int SizeRandomBytes = 32;
        private readonly static SymmetricSecurityKey _secretKey;

        public const string Token = "Token";
        public const string Issuer = "Shop.Server";
        public const string Audience = "http://localhost/";

        static AuthOptions()
        {            
            var key = Convert.FromBase64String(Key);
            _secretKey = new SymmetricSecurityKey(key);
        }

        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return _secretKey;
        }

        public static string GenerateRefreshToken()
        {
            var randomBytes = new byte[SizeRandomBytes];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomBytes);
                return Convert.ToBase64String(randomBytes);
            }
        }
    }
}
