using Shop.Common.Enums;
using Shop.Database.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shop.Database.Models
{
    public class Order : BaseCreateUpdate
    {
        [Required]
        public string UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public ApplicationUser User { get; set; }

        public DateTime? PaidAt { get; set; }

        public DateTime? ShippedAt { get; set; }

        public OrderStatus Status { get; set; } = OrderStatus.Pending;

        [Required]
        public decimal TotalPrice { get; set; }

        [Required]
        [MaxLength(20)]
        public string Currency { get; set; }

        public string Notes { get; set; }

        public int DeliveryAddressId { get; set; }

        [ForeignKey(nameof(DeliveryAddressId))]
        public DeliveryAddress DeliveryAddress { get; set; }

        public ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
    }
}
