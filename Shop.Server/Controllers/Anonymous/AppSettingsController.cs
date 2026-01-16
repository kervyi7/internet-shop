using Microsoft.AspNetCore.Mvc;
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
