using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Shop.Database.Models
{
    [Index(nameof(Name), IsUnique = true)]
    [Index(nameof(Code), IsUnique = true)]
    public class ProductBrand : BaseCodeName
    {
        public ICollection<Product> Products { get; set; } = new List<Product>();
    }
}
