using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shop.Database;
using Shop.Server.Models.DTO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Shop.Server.Controllers.Anonymous
{
    [ApiController]
    [Route("api/[controller]")]
    public class ShippingController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public ShippingController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ShippingOptionDto>>> GetAllActive()
        {
            var activeOptions = await _dataContext.ShippingOptions
                .Where(x => x.IsActive)
                .Select(x => new ShippingOptionDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    Cost = x.Cost,
                    Description = x.Description
                })
                .ToListAsync();

            return Ok(activeOptions);
        }
    }
}
