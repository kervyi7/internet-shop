using log4net;
using Microsoft.AspNetCore.Http;
using Shop.Common.Enums;
using Shop.Common.Settings;
using Shop.Server.Common;
using Shop.Server.Manager;
using Shop.Server.Managers;
using Shop.Server.Models;
using Shop.Server.Models.DTO.Auth;
using System;
using System.Threading.Tasks;
using AppConstants = Shop.Server.Common.AppConstants;

namespace Shop.Server.Providers
{
    public class HistotyProvider
    {
        private static readonly ILog Log = LogManager.GetLogger(typeof(HistotyProvider));

        private BaseHistoryManager _historyManager;

        public HistotyProvider(IAppSettings appSettings)
        {
            HistoryType = appSettings.GetHistoryType();
            _historyManager = GetHistoryManager();
        }

        public HistoryTypes HistoryType { get; private set; }
        public bool Active => _historyManager != null;

        public async Task Save(HttpContext context)
        {
            if(!Active)
            {
                return;
            }
            var dataHistory = new DataHistory();
            dataHistory.TraceIdentifier = context.TraceIdentifier;
            dataHistory.Login = RightsHelper.GetUserName(context.User);
            dataHistory.Url = context.Request.Path;
            dataHistory.Method = context.Request.Method;
            dataHistory.RemoteIpAddress = context.Connection.RemoteIpAddress.ToString();
            dataHistory.ContentType = context.Request.ContentType;
            var body = await TryGetRequestBodyAsync(context);
            if (dataHistory.Url.Contains(AppConstants.AppAuthRoute) && !string.IsNullOrEmpty(body))
            {
                var loginRequest = JsonManager.Deserialize<LoginRequest>(body);
                loginRequest.Password = null;
                var result = JsonManager.Serialize(loginRequest);
                dataHistory.Body = result;
            }
            else
            {
                dataHistory.Body = body;
            }
            await _historyManager.SaveAsync(dataHistory);
        }

        private async Task<string> TryGetRequestBodyAsync(HttpContext context)
        {
            try
            {
                return await context.GetRequestBodyAsync();
            }
            catch (Exception exception)
            {
                Log.Error(exception);
                return string.Empty;
            }
        }

        private BaseHistoryManager GetHistoryManager()
        {
            if (HistoryType == HistoryTypes.File)
            {
                return new FileHistoryManager();
            }
            if (HistoryType == HistoryTypes.Sql)
            {
                throw new NotImplementedException("Sql not implemented");
            }
            return null;
        }
    }
}
