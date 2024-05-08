using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shop.Database.Models;
using Shop.Database;
using System.Threading.Tasks;
using Shop.Common.Localization;
using Shop.Common.Constants;

namespace Shop.Server.Controllers.Anonymous
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppSettingsController : ControllerBase
    {
        [HttpGet("localization/{type}")]
        public ActionResult<ILocalization> GetLocalization(string type)
        {
            if (type == LocalizationTypes.Pl)
            {
                return new PlLocalization();
            }
            return new EnLocalization();
        }
    }
}
