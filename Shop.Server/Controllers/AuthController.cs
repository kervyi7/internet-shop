using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shop.Server.Auth;
using Shop.Server.DTO.Auth;
using Shop.Server.Exceptions;
using Shop.Server.Models.DTO.Auth;
using System.Threading.Tasks;

namespace Shop.Server.Controllers
{
    // Kontroler odpowiedzialny za obsługę autoryzacji i uwierzytelniania użytkowników.
    // Udostępnia endpointy API do logowania, rejestracji, odświeżania tokenu i wylogowania.
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        // Wstrzyknięcie zależności do klasy AuthManager, która realizuje logikę autoryzacji (generowanie tokenów, rejestracja itp.)
        private readonly AuthManager _authManager;

        public AuthController(AuthManager authManager)
        {
            _authManager = authManager;
        }

        // Logowanie użytkownika — przyjmuje nazwę użytkownika i hasło, zwraca token autoryzacyjny w przypadku poprawnych danych.
        [HttpPost("login")] // Endpoint POST: api/auth/login
        public async Task<ActionResult<AuthResponse>> LogIn(LoginRequest request)
        {
            // Walidacja danych wejściowych і wyrzucenie wyjątku w przypadku błędnych danych logowania
            if (string.IsNullOrEmpty(request.UserName) || string.IsNullOrEmpty(request.Password))
            {
                throw new AuthException(nameof(AuthErrorCodes.InvalidGrant), "LanguageResources.OAuthInvalidGrant_Error");
            }
            var token = await _authManager.LogIn(request.UserName, request.Password); // Próba logowania i wygenerowanie tokenu JWT
            return Ok(token);
        }

        // Rejestracja nowego użytkownika w systemie. Po udanej rejestracji automatycznie loguje użytkownika i zwraca token dostępu.
        [HttpPost("registration")] // Endpoint POST: api/auth/registration
        public async Task<ActionResult<TokenDto>> RegistrationStudent(RegistrationRequest request)
        {
            if (string.IsNullOrEmpty(request.UserName) || string.IsNullOrEmpty(request.Password))
            {
                throw new AuthException(nameof(AuthErrorCodes.InvalidGrant), "LanguageResources.OAuthInvalidGrant_Error");
            }
            await _authManager.Registration(request); // Utworzenie nowego konta użytkownika
            var token = await _authManager.LogIn(request.UserName, request.Password); // Automatyczne logowanie po rejestracji
            return Ok(token);
        }

        // Odświeżanie tokenu JWT przy użyciu tokenu odświeżania (refresh token).
        [HttpPost("refresh")] // Endpoint POST: api/auth/refresh
        public async Task<ActionResult<TokenDto>> Refresh(ExchangeRefreshTokenRequest request)
        {
            if (string.IsNullOrEmpty(request.AccessToken) || string.IsNullOrEmpty(request.RefreshToken))
            {
                throw new AuthException(nameof(AuthErrorCodes.InvalidGrant), "LanguageResources.OAuthInvalidGrant_Error");
            }
            var token = await _authManager.RefreshToken(request.AccessToken, request.RefreshToken); // Wygenerowanie nowego zestawu tokenów dostępowych
            return Ok(token);
        }

        // Wymaga autoryzacji – usuwa refresh token przypisany do zalogowanego użytkownika.
        [Authorize]
        [HttpGet("logout")] // Endpoint GET: api/auth/logout
        public async Task<ActionResult> LogOut()
        {
            await _authManager.RemoveRefreshToken(User); // Usunięcie tokenu odświeżania z bazy danych
            return Ok();
        }
    }
}
