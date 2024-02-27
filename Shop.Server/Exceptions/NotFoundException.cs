using System;

namespace Shop.Server.Exceptions
{
    public class NotFoundException : Exception
    {
        private const string PropertyExpression = "Model: {0} not found by property: '{1}', value: '{2}'";

        public NotFoundException(string model, string property, object value) :
            base(string.Format(PropertyExpression, model, property, value))
        {
        }

        public NotFoundException(string message, params object[] args) :
            base(string.Format(message, args))
        {
        }
    }
}