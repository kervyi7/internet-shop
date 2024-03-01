using System.Collections.Generic;

namespace Shop.Database.Models
{
    public class ProductBrand : BaseCodeName
    {
        public ICollection<Product> Products { get; set; } = new List<Product>();
    }
}
