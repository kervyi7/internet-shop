using System.ComponentModel.DataAnnotations;

namespace Shop.Server.Models.DTO
{
    public class PropertyDto<T> : CodeNameDto
    {
        [Required]
        public int ProductId { get; set; }

        public bool IsPrimary { get; set; }

        public bool IsTitle { get; set; }

        public string Description { get; set; }

        public string Suffix { get; set; }

        [Required]
        public T Value { get; set; }
    }
}
