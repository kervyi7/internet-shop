using System.Collections.Generic;

namespace Shop.Server.Models.DTO
{
    public class OrderItemDto
    {
        public int ProductId { get; set; }
        public decimal Quantity { get; set; }
    }

    public class OrderDto
    {
        public string UserId { get; set; }
        public int? DeliveryAddressId { get; set; }
        public int ShippingOptionId { get; set; }
        public string Notes { get; set; }
        public DeliveryAddressDto DeliveryAddress { get; set; }
        public List<OrderItemDto> Items { get; set; }
    }
}
