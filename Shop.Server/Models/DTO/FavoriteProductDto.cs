using System.Collections.Generic;

namespace Shop.Server.Models.DTO
{
    public class ShortFavoriteProductDto
    {
        public string UserId { get; set; }
        public int ProductId { get; set; }
    }

    public class FavoriteProductDto
    {
        public int ProductId { get; set; }
        public ProductDto Product { get; set; }
    }
}
