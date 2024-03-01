using System;
namespace Shop.Server.Exceptions
{
    public class ConflictException : Exception
    {
        public ConflictException(string message, params object[] args) : base(string.Format(message, args))
        {
        }
    }
}