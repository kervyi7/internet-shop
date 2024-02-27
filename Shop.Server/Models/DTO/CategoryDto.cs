using System.ComponentModel.DataAnnotations;

namespace Shop.Server.Models.DTO
{
    public class CategoryDto
    {
        public int Id { get; set; }

        public ImageDto Image { get; set; }

        public int? Position { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Code { get; set; }
    }
}
