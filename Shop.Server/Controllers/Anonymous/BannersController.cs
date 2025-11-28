using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shop.Database;
using Shop.Database.Models;
using Shop.Server.Common;
using Shop.Server.Models.DTO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Shop.Server.Controllers.Anonymous
{
    [ApiController]
    [Route("api/[controller]")]
    public class BannersController : ControllerBase
    {
        private readonly DataContext _dataContext;
        public BannersController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Banner>>> GetAll()
        {
            var banners = await _dataContext.Banners
                .Include(x => x.Images)
                .Where(x => x.IsActive)
                .ToListAsync();

            if (banners == null || banners.Count == 0)
                return NotFound();

            var bannersDto = banners.Select(b => new BannerDto
            {
                Id = b.Id,
                Header = b.Header,
                Text = b.Text,
                Type = b.Type,
                IsActive = b.IsActive,
                Images = b.Images.ToViewModels()
            }).ToList();

            if (!bannersDto.Any())
                return NotFound();

            return Ok(bannersDto);
        }
    }
}
