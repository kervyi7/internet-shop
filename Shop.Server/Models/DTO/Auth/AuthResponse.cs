namespace Shop.Server.Models.DTO.Auth
{
    public class AuthResponse
    {
        public TokenDto Token { get; set; }
        public TwoFactorAuthDto TwoFactorAuth { get; set; }
    }
}
