using System;
namespace Shop.Database.Models
{
    public class PaymentSession
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public int OrderId { get; set; }
        public string StripeSessionId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public Order Order { get; set; }
    }
}
