using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace Shop.Server.Controllers
{
    public class HomeController : ControllerBase
    {
        private readonly IWebHostEnvironment _enviroment;

        private const string FileName = "index.html";
        private const string FileType = "text/html";

        public HomeController(IWebHostEnvironment enviroment)
        {
            _enviroment = enviroment;
        }

        public IActionResult Index()
        {
            return new PhysicalFileResult(Path.Combine(_enviroment.WebRootPath, FileName), FileType);
        }
    }
}
