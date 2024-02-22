namespace Shop.Server.Models.DTO.Auth
{
    public class TokenDto
    {
        public string AccessToken { get; set; }

        public string RefreshToken { set; get; }

        public long AccessExpires { get; set; }

        public long RefreshExpires { get; set; }
    }
}