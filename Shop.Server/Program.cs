
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.Runtime.InteropServices;

namespace Shop.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args)
        {
            return Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.ConfigureLogging(logging =>
                    {
#if RELEASE
                        logging.ClearProviders();
#endif
                        if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
                        {
                            logging.AddLog4Net("log4netWin.config");
                        }
                        else
                        {
                            logging.AddLog4Net("log4netLinux.config");
                        }
                    }).UseStartup<Startup>();
                });
        }
    }
}
