namespace Shop.Server.Models.DTO
{
    public class ShippingOptionDto : BaseDto
    {
        public string Name { get; set; }
        public decimal Cost { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
