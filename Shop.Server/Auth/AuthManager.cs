using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Shop.Database.Identity;
using Shop.Database;
using Shop.Common.Settings;
using Shop.Server.Exceptions;
using Shop.Server.Common;
using Shop.Server.Models.DTO.Auth;

namespace Shop.Server.Auth
{
    public class AuthManager
    {
        private const string SecurityTokenType = nameof(UserRefreshToken.SecurityTokenCode);
        private readonly DataContext _dataContext;
        private readonly IAppSettings _appSettings;
        private readonly UserManager<ApplicationUser> _userManager;

        public AuthManager(
            UserManager<ApplicationUser> userManager,
            DataContext dataContext,
            IAppSettings appSettings)
        {
            _userManager = userManager;
            _dataContext = dataContext;
            _appSettings = appSettings;
        }

        public async Task<AuthResponse> LogIn(string userName, string password)
        {
            var user = await GetApplicationUser(userName, password);
            if (user == null)
            {
                throw new AuthException(nameof(AuthErrorCodes.InvalidGrant), "LanguageResources.Login_Error");
            }
            var token = await LogIn(user);
            return new AuthResponse
            {
                Token = token
            };
        }

        public async Task RemoveRefreshToken(IPrincipal principal)
        {
            var userId = principal.GetUserId();
            var securityTokenCode = principal.GetClaimValue(SecurityTokenType);
            var userRefreshToken = await _dataContext.UserRefreshTokens
                .FirstOrDefaultAsync(x => x.UserId == userId && x.SecurityTokenCode == securityTokenCode);
            if (userRefreshToken == null)
            {
                return;
            }
            _dataContext.UserRefreshTokens.Remove(userRefreshToken);
            await _dataContext.SaveChangesAsync();
        }

        public async Task<TokenDto> RefreshToken(string accessToken, string refreshToken)
        {
            var claimsPrincipal = ValidateToken(accessToken);
            var userId = claimsPrincipal.GetUserId();
            var securityTokenCode = claimsPrincipal.GetClaimValue(SecurityTokenType);
            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(securityTokenCode))
            {
                throw new AuthException(nameof(AuthErrorCodes.InvalidGrant), "LanguageResources.RefreshToken_Error");
            }
            var userRefreshToken = await _dataContext.UserRefreshTokens
                .Include(x => x.User)
                .FirstOrDefaultAsync(x => x.UserId == userId && x.SecurityTokenCode == securityTokenCode && x.RefreshToken == refreshToken);
            if (userRefreshToken == null)
            {
                throw new AuthException(nameof(AuthErrorCodes.InvalidGrant), "LanguageResources.RefreshToken_Error");
            }
            _dataContext.UserRefreshTokens.Remove(userRefreshToken);
            await _dataContext.SaveChangesAsync();
            if (userRefreshToken.Expires < DateTime.UtcNow)
            {
                throw new AuthException(nameof(AuthErrorCodes.InvalidGrant), "LanguageResources.RefreshToken_Error");
            }
            return await CreateToken(userRefreshToken.User);
        }

        public async Task<TokenDto> LogIn(ApplicationUser applicationUser)
        {
            LoginValidate(applicationUser);
            await RemoveExpiredRefreshTokens(applicationUser.Id);
            return await CreateToken(applicationUser);
        }

        public async Task<ApplicationUser> GetApplicationUser(string userName, string password)
        {
            var user = await _userManager.FindByNameAsync(userName);
            if (user == null)
            {
                return null;
            }
            var result = await _userManager.CheckPasswordAsync(user, password);
            if (!result)
            {
                return null;
            }
            return user;
        }

        private void LoginValidate(ApplicationUser user)
        {
            if (!user.Active)
            {
                throw new AuthException(nameof(AuthErrorCodes.UserNotActive), "LanguageResources.User_Active_Error");
            }
            if (!user.Confirmed && !user.EmailConfirmed && !user.PhoneNumberConfirmed)
            {
                throw new AuthException(nameof(AuthErrorCodes.NotConfirmed), "LanguageResources.UserNotVerified");
            }
        }

        private async Task RemoveExpiredRefreshTokens(string userId)
        {
            var userRefreshTokens = await _dataContext.UserRefreshTokens
                .Where(x => x.UserId == userId && x.Expires < DateTime.UtcNow)
                .ToListAsync();
            if (!userRefreshTokens.Any())
            {
                return;
            }
            _dataContext.UserRefreshTokens.RemoveRange(userRefreshTokens);
            await _dataContext.SaveChangesAsync();
        }

        private ClaimsPrincipal ValidateToken(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
                ValidateLifetime = false
            };
            try
            {
                var jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
                var principal = jwtSecurityTokenHandler.ValidateToken(
                    token,
                    tokenValidationParameters,
                    out var securityToken);
                if (!(securityToken is JwtSecurityToken jwtSecurityToken) || !jwtSecurityToken.Header.Alg.Equals(
                        SecurityAlgorithms.HmacSha256,
                        StringComparison.InvariantCultureIgnoreCase))
                {
                    throw new AuthException(nameof(AuthErrorCodes.InvalidGrant), "LanguageResources.RefreshToken_Error");
                }
                return principal;
            }
            catch (Exception e)
            {
                throw new AuthException(nameof(AuthErrorCodes.InvalidGrant), "LanguageResources.RefreshToken_Error", e);
            }
        }

        private async Task<ClaimsIdentity> CreateIdentity(ApplicationUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.UserName),
                new Claim(ClaimTypes.Surname, user.LastName),
                new Claim(ClaimTypes.GivenName, user.FirstName),
                new Claim(ClaimTypes.NameIdentifier, user.Id)
            };
            var roles = await _userManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimsIdentity.DefaultRoleClaimType, role));
            }
            var claimsIdentity = new ClaimsIdentity(
                claims,
                AuthOptions.Token,
                ClaimsIdentity.DefaultNameClaimType,
                ClaimsIdentity.DefaultRoleClaimType);
            return claimsIdentity;
        }

        private async Task<TokenDto> CreateToken(ApplicationUser applicationUser)
        {
            var identity = await CreateIdentity(applicationUser);
            var securityTokenCode = Guid.NewGuid().ToString();
            identity.AddClaim(new Claim(SecurityTokenType, securityTokenCode));
            var now = DateTime.UtcNow;
            var accessExpireTimeSpan = TimeSpan.FromMinutes(_appSettings.AuthConfig.AccessTokenExpireTimeInMinutes);
            var refreshExpireTimeSpan = accessExpireTimeSpan + TimeSpan.FromMinutes(_appSettings.AuthConfig.RefreshTokenExpireTimeInMinutes);
            var jwt = new JwtSecurityToken(
                AuthOptions.Issuer,
                AuthOptions.Audience,
                notBefore: now,
                claims: identity.Claims,
                expires: now.Add(accessExpireTimeSpan),
                signingCredentials: new SigningCredentials(
                    AuthOptions.GetSymmetricSecurityKey(),
                    SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
            var refreshToken = AuthOptions.GenerateRefreshToken();
            var userRefreshToken = new UserRefreshToken
            {
                UserId = applicationUser.Id,
                SecurityTokenCode = securityTokenCode,
                RefreshToken = refreshToken,
                Expires = now.Add(refreshExpireTimeSpan)
            };
            _dataContext.UserRefreshTokens.Add(userRefreshToken);
            await _dataContext.SaveChangesAsync();
            return new TokenDto
            {
                AccessToken = encodedJwt,
                RefreshToken = refreshToken,
                AccessExpires = new DateTimeOffset(jwt.ValidTo).ToUnixTimeMilliseconds(),
                RefreshExpires = new DateTimeOffset(userRefreshToken.Expires).ToUnixTimeMilliseconds()
            };
        }
    }
}