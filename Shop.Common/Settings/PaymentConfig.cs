namespace Shop.Common.Settings
{
    public class PaymentConfig
    {
        public string SecretKeyStripe { get; set; }
        public string WebhookSecret { get; set; }
        public string SuccessUrl { get; set; }
        public string CancelUrl { get; set; }
        public string FrontendSuccessPage { get; set; }
        public string FrontendCancelPage { get; set; }

    }
}
