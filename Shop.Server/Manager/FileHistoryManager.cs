using log4net;
using Shop.Server.Models;
using System;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Server.Managers
{
    public class FileHistoryManager: BaseHistoryManager
    {
        private const string Сolon = ": ";
        private const int StartIndex = 0;
        private const int BodyCount = 1000;

        private static readonly ILog Log = LogManager.GetLogger(typeof(FileHistoryManager));

        public override Task SaveAsync(DataHistory dataHistory)
        {
            var history = ToString(dataHistory);
            Log.Info(history);
            return Task.CompletedTask;
        }

        private string ToString(DataHistory dataHistory)
        {
            var sb = new StringBuilder();
            sb.Append(Environment.NewLine);
            sb.Append(nameof(DataHistory.CreateOn));
            sb.Append(Сolon);
            sb.Append(dataHistory.CreateOn);
            sb.Append(Environment.NewLine);

            sb.Append(nameof(DataHistory.TraceIdentifier));
            sb.Append(Сolon);
            sb.Append(dataHistory.TraceIdentifier);
            sb.Append(Environment.NewLine);

            sb.Append(nameof(DataHistory.Login));
            sb.Append(Сolon);
            sb.Append(dataHistory.Login);
            sb.Append(Environment.NewLine);

            sb.Append(nameof(DataHistory.Url));
            sb.Append(Сolon);
            sb.Append(dataHistory.Url);
            sb.Append(Environment.NewLine);

            sb.Append(nameof(DataHistory.Method));
            sb.Append(Сolon);
            sb.Append(dataHistory.Method);
            sb.Append(Environment.NewLine);

            sb.Append(nameof(DataHistory.RemoteIpAddress));
            sb.Append(Сolon);
            sb.Append(dataHistory.RemoteIpAddress);
            sb.Append(Environment.NewLine);

            sb.Append(nameof(DataHistory.ContentType));
            sb.Append(Сolon);
            sb.Append(dataHistory.ContentType);
            sb.Append(Environment.NewLine);

            sb.Append(nameof(DataHistory.Body));
            sb.Append(Сolon);
            if(!string.IsNullOrEmpty(dataHistory.Body))
            {
                var count = dataHistory.Body.Length > BodyCount ? BodyCount : dataHistory.Body.Length;
                sb.Append(dataHistory.Body, StartIndex, count);
            }
            sb.Append(Environment.NewLine);

            return sb.ToString();
        }
    }
}
