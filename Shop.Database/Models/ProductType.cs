using System.Collections.Generic;

namespace Shop.Database.Models
{
    public class ProductType : BaseCodeName
    {
        public ICollection<Product> Products { get; set; } = new List<Product>();
    }
}
