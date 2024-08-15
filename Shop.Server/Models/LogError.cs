using System;
using System.Security.Principal;
using Shop.Server.Common;

namespace Shop.Server.Models
{
    public class LogError
    {
        public LogError(IPrincipal principal, string url, string method, string body, string message, string traceIdentifier)
        {
            Login = RightsHelper.GetUserName(principal);
            Url = url;
            Method = method;
            Body = body;
            Message = message;
            TraceIdentifier = traceIdentifier;
        }

        public string Login { get; set; }
        public string Url { get; set; }
        public string Method { get; set; }
        public string Body { get; set; }
        public string Message { get; set; }
        public string TraceIdentifier { get; set; }

        public override string ToString()
        {
            return $"{Environment.NewLine}" +
                   $"TraceIdentifier: {TraceIdentifier}{Environment.NewLine}" +
                   $"Login: {Login}{Environment.NewLine}" +
                   $"Url: {Url}{Environment.NewLine}" +
                   $"Method: {Method}{Environment.NewLine}" +
                   $"Body: {Body}{Environment.NewLine}" +
                   $"Message: {Message}{Environment.NewLine}";
        }
    }
}