namespace Shop.Server.Models
{
    public class CreateCheckoutSessionRequest
    {
        public int OrderId { get; set; }
        public string ProductName { get; set; }
        public decimal Amount { get; set; }
    }
}
