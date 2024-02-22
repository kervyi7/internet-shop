using System.ComponentModel.DataAnnotations;

namespace Shop.Server.Models.DTO.Auth
{
    public class TwoFactorAuthDto
    {
        public string QuickResponseCodeBase64 { get; set; }
        public string Type { get; set; }
        public string SessionId { get; set; }
    }

    public class TwoFactorAuthRequest
    {
        [Required]
        public string Code { get; set; }

        [Required]
        public string Type { get; set; }

        [Required]
        public string SessionId { get; set; }
    }
}
