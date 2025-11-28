using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shop.Database.Models
{
    public class Image : BaseCreateUpdate
    {
        [Required]
        public byte[] Body { get; set; }

        public byte[] SmallBody { get; set; }

        public int FileSize { get; set; }

        [Required]
        [MaxLength(250)]
        public string FileName { get; set; }

        [Required]
        [MaxLength(250)]
        public string Name { get; set; }

        [Required]
        [MaxLength(30)]
        public string MimeType { get; set; }

        public int? BannerId { get; set; }

        [ForeignKey(nameof(BannerId))]
        public Banner Banner { get; set; }

        public ICollection<ProductImage> ProductImages { get; } = new List<ProductImage>();
    }
}
