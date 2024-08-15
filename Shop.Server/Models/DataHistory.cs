using System;

namespace Shop.Server.Models
{
    public class DataHistory
    {
        public DataHistory()
        {
            CreateOn = DateTime.Now;
        }

        public DateTime CreateOn { get; set; }
        public string TraceIdentifier { get; set; }
        public string Login { get; set; }
        public string Url { get; set; }
        public string Method { get; set; }
        public string Body { get; set; }
        public string ContentType { get; set; }
        public string RemoteIpAddress { get; set; }
    }
}
