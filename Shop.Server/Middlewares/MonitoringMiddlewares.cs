using log4net;
using Microsoft.AspNetCore.Http;
using Shop.Common;
using Shop.Server.Providers;
using System;
using System.Threading.Tasks;

namespace Shop.Server.Middlewares
{
    public class MonitoringMiddlewares
    {
        private static readonly ILog Log = LogManager.GetLogger(typeof(MonitoringMiddlewares));
        private readonly HistotyProvider _histotyProvider;
        private readonly RequestDelegate _next;

        public MonitoringMiddlewares(RequestDelegate next, HistotyProvider histotyProvider)
        {
            _next = next;
            _histotyProvider = histotyProvider;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            if (context.Request.ContentType == ContentTypeConstants.ContentJson)
            {
                context.Request.EnableBuffering();
            }
            await _next(context);
            try
            {
                await _histotyProvider.Save(context);
            }
            catch (Exception exception)
            {
                Log.Error(exception);
            }
        }
    }
}
