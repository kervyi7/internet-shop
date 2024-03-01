using System.ComponentModel.DataAnnotations;

namespace Shop.Server.Models.DTO
{
    public class CodeNameDto : BaseDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Code { get; set; }
    }
}
