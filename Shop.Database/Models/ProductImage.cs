using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shop.Database.Models
{
    [Index(nameof(ProductId), nameof(ImageId), IsUnique = true)]
    public class ProductImage : BaseModel
    {
        public int ProductId { get; set; }
        public int ImageId { get; set; }

        [ForeignKey(nameof(ProductId))]
        public Product Product { get; set; }

        [ForeignKey(nameof(ImageId))]
        public Image Image { get; set; }
    }
}
