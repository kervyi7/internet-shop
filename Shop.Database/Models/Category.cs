using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shop.Database.Models
{
    [Index(nameof(Name), IsUnique = true)]
    [Index(nameof(Code), IsUnique = true)]
    public class Category : BaseCodeName
    {
        public int ImageId { get; set; }

        [ForeignKey(nameof(ImageId))]
        public Image Image { get; set; }

        public int? Position { get; set; }

        public ICollection<Product> Products { get; } = new List<Product>();
    }
}
