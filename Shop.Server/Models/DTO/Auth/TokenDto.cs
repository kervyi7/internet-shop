namespace Shop.Server.Models.DTO.Auth
{
    public class TokenDto
    {
        public string AccessToken { get; set; }

        public string RefreshToken { set; get; }
    }
}