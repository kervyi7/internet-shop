using System.Text.Json;
using System;
using Shop.Server.Exceptions;

namespace Shop.Server.Manager
{
    public class JsonManager
    {
        public static readonly JsonSerializerOptions JsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };

        public static T Deserialize<T>(string value)
        {
            try
            {
                if (string.IsNullOrEmpty(value))
                {
                    return default(T);
                }
                var result = JsonSerializer.Deserialize<T>(value, JsonOptions);
                return result;
            }
            catch (Exception ex)
            {
                var type = typeof(T);
                throw new JsonManagerException(value, type.Name, ex);
            }
        }

        public static string Serialize<T>(T value)
        {
            try
            {
                if (value == null)
                {
                    return null;
                }
                var result = JsonSerializer.Serialize(value, JsonOptions);
                return result;
            }
            catch (Exception ex)
            {
                var type = typeof(T);
                throw new JsonManagerException(value.ToString(), type.Name, ex);
            }
        }
    }
}
