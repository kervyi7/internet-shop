using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shop.Database.Models
{
    public class Image : BaseCreateUpdate
    {
        public Image()
        {
        }

        [Required]
        public byte[] Body { get; set; }

        public byte[] SmallBody { get; set; }

        public int FileSize { get; set; }

        public bool IsTitle { get; set; }

        [Required]
        public string FileName { get; set; }

        [Required]
        public string MimeType { get; set; }

        public int CategoryId { get; set; }

        [ForeignKey(nameof(CategoryId))]
        public Category Category { get; set; }

        public ICollection<Product> Products { get; set; } = new List<Product>();
        public ICollection<ProductImage> ProductImages { get; } = new List<ProductImage>();
    }
}
