namespace Shop.Server.Models.DTO
{
    public class ProductDto : CodeNameDto
    {
        public int TypeId { get; set; }
        public int BrandId { get; set; }
        public decimal Price { get; set; }
        public string Currency { get; set; }
    }
}
