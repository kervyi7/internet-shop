using System;
using System.Net;
using System.Security.Principal;
using System.Threading.Tasks;
using log4net;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using Shop.Common;
using Shop.Server.Common;
using Shop.Server.Exceptions;
using Shop.Server.Manager;
using Shop.Server.Models;
using Shop.Server.Models.DTO.Auth;

namespace Shop.Server.Middlewares
{
    public class ErrorHandlingMiddleware
    {
        private static readonly ILog Log = LogManager.GetLogger(typeof(ErrorHandlingMiddleware));
        private readonly RequestDelegate _next;

        public ErrorHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                if (context.Request.ContentType == ContentTypeConstants.ContentJson)
                {
                    context.Request.EnableBuffering();
                }
                await _next(context);
            }
            catch (HttpResponseException exception)
            {
                await HandleHttpExceptionAsync(exception, context);
            }
            catch (ConflictException exception)
            {
                await HandleExceptionAsync(exception, context, HttpStatusCode.Conflict);
            }
            catch (SqlException exception)
            {
                await HandleExceptionAsync(exception, context, HttpStatusCode.InternalServerError);
            }
            catch (NotFoundException exception)
            {
                await HandleExceptionAsync(exception, context, HttpStatusCode.NotFound);
            }
            catch (AuthException exception)
            {
                await HandleAuthExceptionAsync(exception, context, HttpStatusCode.BadRequest);
            }
            catch (Exception exception)
            {
                await HandleExceptionAsync(exception, context, HttpStatusCode.BadRequest);
            }
        }

        private async Task<string> TryGetRequestBodyAsync(HttpContext context)
        {
            try
            {
                return await context.GetRequestCopyBodyAsync();
            }
            catch (Exception exception)
            {
                Log.Error(exception);
                return string.Empty;
            }
        }

        private async Task HandleAuthExceptionAsync(AuthException exception, HttpContext context, HttpStatusCode statusCode)
        {
            await SaveLog(exception, context);
            var authErrorResponse = new AuthErrorResponse
            {
                Code = exception.Code,
                ErrorDescription = exception.Message
            };
            var content = JsonManager.Serialize(authErrorResponse);
            await SendContentResponse(context, content, statusCode);
        }

        private async Task HandleExceptionAsync(Exception exception, HttpContext context, HttpStatusCode statusCode)
        {
            await SaveLog(exception, context);
            var error = exception.GetErrorDto();
            await SendContentResponse(context, error, statusCode);
        }

        private async Task HandleHttpExceptionAsync(HttpResponseException exception, HttpContext context)
        {
            await SaveLog(exception, context);
            var content = exception.Content;
            await SendContentResponse(context, content, exception.HttpStatusCode);
        }

        private async Task SendContentResponse(HttpContext context, string content, HttpStatusCode statusCode)
        {
            context.Response.ContentType = ContentTypeConstants.ContentJson;
            context.Response.StatusCode = (int)statusCode;
            await context.Response.WriteAsync(content);
        }

        private async Task SaveLog(Exception exception, HttpContext context)
        {
            var body = await TryGetRequestBodyAsync(context);
            var logException = CreateLogError(
                context.User,
                context.Request,
                body,
                exception.Message,
                context.TraceIdentifier);
            Log.Error(logException.ToString(), exception);
        }

        private LogError CreateLogError(
            IPrincipal principal,
            HttpRequest request,
            string body,
            string message,
            string traceIdentifier)
        {
            return new LogError(principal, request.Path, request.Method, body, message, traceIdentifier);
        }
    }
}