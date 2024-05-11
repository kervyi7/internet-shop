using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shop.Server.Auth;
using Shop.Server.DTO.Auth;
using Shop.Server.Exceptions;
using Shop.Server.Models.DTO.Auth;

namespace Shop.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthManager _authManager;

        public AuthController(AuthManager authManager)
        {
            _authManager = authManager;
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponse>> LogIn(LoginRequest request)
        {
            if (string.IsNullOrEmpty(request.UserName) || string.IsNullOrEmpty(request.Password))
            {
                throw new AuthException(nameof(AuthErrorCodes.InvalidGrant), "LanguageResources.OAuthInvalidGrant_Error");
            }
            var token = await _authManager.LogIn(request.UserName, request.Password);
            return Ok(token);
        }

        [HttpPost("refresh")]
        public async Task<ActionResult<TokenDto>> Refresh(ExchangeRefreshTokenRequest request)
        {
            if (string.IsNullOrEmpty(request.AccessToken) || string.IsNullOrEmpty(request.RefreshToken))
            {
                throw new AuthException(nameof(AuthErrorCodes.InvalidGrant), "LanguageResources.OAuthInvalidGrant_Error");
            }
            var token = await _authManager.RefreshToken(request.AccessToken, request.RefreshToken);
            return Ok(token);
        }

        [Authorize]
        [HttpGet("logout")]
        public async Task<ActionResult> LogOut()
        {
            await _authManager.RemoveRefreshToken(User);
            return Ok();
        }
    }
}