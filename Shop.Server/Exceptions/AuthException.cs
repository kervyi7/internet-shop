using System;

namespace Shop.Server.Exceptions
{
    public class AuthException : Exception
    {
        public AuthException(string code, string message, Exception innerException = null) : base(message, innerException)
        {
            Code = code;
        }

        public string Code { get; }
    }
}
