namespace Shop.Server.Models.DTO
{
    public class CreateProductDto : CodeNameDto
    {
        public int TypeId { get; set; }
        public int BrandId { get; set; }
        public int CategoryId { get; set; }
        public decimal Price { get; set; }
        public string Currency { get; set; }
    }
}
