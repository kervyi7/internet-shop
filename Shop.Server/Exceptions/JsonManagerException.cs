using System;

namespace Shop.Server.Exceptions
{
    public class JsonManagerException : Exception
    {
        private const string JsonExpression = "Value: '{0}', type: '{1}'";
        public JsonManagerException(string value, string type, Exception ex) : base(string.Format(JsonExpression, value, type), ex)
        { }
    }
}
