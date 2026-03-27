using System;
using System.Net;

namespace Shop.Server.Exceptions
{
    public class HttpResponseException : Exception
    {
        private const string ErrorResponse = "Error Response:{0}  HttpStatusCode: {1}{0}  Url: {2}{0}  Content: {3}";

        public HttpResponseException(HttpStatusCode httpStatusCode, string url, string content)
            : base(string.Format(ErrorResponse, Environment.NewLine, httpStatusCode.GetHashCode(), url, content))
        {
            HttpStatusCode = httpStatusCode;
            Content = content;
        }

        public HttpStatusCode HttpStatusCode { get; }
        public string Content { get; }
    }
}
