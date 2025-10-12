namespace Shop.Server.Models.DTO
{
    public class ShortCartItemDto
    {
        public string UserId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }

    public class CartItemDto
    {
        public string UserId { get; set; }
        public int ProductId { get; set; }
        public ProductDto Product { get; set; }
        public int Quantity { get; set; }
    }

}
