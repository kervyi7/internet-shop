using System.ComponentModel.DataAnnotations;

namespace Shop.Server.Models.DTO
{
    public class PropertyDto<T> : CodeNameDto
    {
        public int? ProductId { get; set; }

        [Required]
        public int PropertyTemplateId { get; set; }

        public bool IsPrimary { get; set; }

        public bool IsTitle { get; set; }

        public string Description { get; set; }

        public string Suffix { get; set; }

        [Required]
        public T Value { get; set; }
    }
}
