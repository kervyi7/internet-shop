using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shop.Common.Enums;
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
    public class AdminBannersController : ControllerBase
    {
        private readonly DataContext _dataContext;
        public AdminBannersController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Banner>>> GetAll()
        {
            var banners = await _dataContext.Banners
                .Include(x => x.Images)
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

        [HttpPut]
        public async Task<ActionResult> Update([FromBody] BannerUpdateDto dto)
        {
            var banner = await _dataContext.Banners
                .Include(x => x.Images)
                .FirstOrDefaultAsync(x => x.Id == dto.Id);

            if (banner == null)
                return NotFound();

            banner.Header = dto.Header;
            banner.Text = dto.Text;
            banner.IsActive = dto.IsActive;

            if (dto.ImageIds != null || banner.Type != BannerType.Promo)
            {
                foreach (var img in banner.Images)
                    img.BannerId = null;

                var newImages = await _dataContext.Images
                    .Where(x => dto.ImageIds.Contains(x.Id))
                    .ToListAsync();

                foreach (var img in newImages)
                    img.BannerId = banner.Id;

                banner.Images = newImages;
            }

            await _dataContext.SaveChangesAsync();
            return Ok(banner);
        }
    }
}
