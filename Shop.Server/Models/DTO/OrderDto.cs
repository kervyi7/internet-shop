using Shop.Common.Enums;
using Shop.Database.Models;
using System.Collections.Generic;

namespace Shop.Server.Models.DTO
{
    public class OrderItemDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal PriceAtPurchase { get; set; }
        public ShortProductDto Product { get; set; }
    }
    
    public class OrderDto : BaseDto
    {
        public string UserId { get; set; }
        public int? DeliveryAddressId { get; set; }
        public int ShippingOptionId { get; set; }
        public ShippingOptionDto ShippingOption { get; set; }
        public OrderStatus Status { get; set; }
        public string Notes { get; set; }
        public DeliveryAddressDto DeliveryAddress { get; set; }
        public List<OrderItemDto> Items { get; set; }
    }
}
