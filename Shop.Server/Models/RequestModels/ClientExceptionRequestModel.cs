namespace Shop.Server.RequestModels
{
    public class ClientExceptionRequestModel
    {
        public string Url { get; set; }
        public string Message { get; set; }
        public string CallStack { get; set; }
    }
}