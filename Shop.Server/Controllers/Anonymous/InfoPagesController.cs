using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shop.Database;
using Shop.Database.Models;
using Shop.Server.Models.DTO;
using System.Threading.Tasks;

namespace Shop.Server.Controllers.Anonymous
{
    [ApiController]
    [Route("api/[controller]")]
    public class InfoPagesController : ControllerBase
    {
        private readonly DataContext _dataContext;
        public InfoPagesController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<InfoPageDto>> GetAll()
        {
            var pages = await _dataContext.InfoPages.ToListAsync();
            if (pages == null) return NotFound();
            return Ok(pages);
        }

        [HttpGet("{key}")]
        public async Task<ActionResult<InfoPageDto>> Get(string key)
        {
            var page = await _dataContext.InfoPages.FirstOrDefaultAsync(x => x.Key == key);
            if (page == null) return NotFound();
            return Ok(page);
        }

        [HttpPut]
        public async Task<ActionResult> Update([FromBody] InfoPageDto dto)
        {
            var page = await _dataContext.InfoPages.FirstOrDefaultAsync(x => x.Key == dto.Key);
            if (page == null) return NotFound();
            page.Header = dto.Header;
            page.HtmlContent = dto.HtmlContent;
            await _dataContext.SaveChangesAsync();
            return Ok(page);
        }

        [HttpGet("contacts")]
        public async Task<ActionResult<ShopContactInfo>> GetContacts()
        {
            var info = await _dataContext.ShopContactInfos.FirstOrDefaultAsync();
            if (info == null) return Ok(new ShopContactInfo());
            return Ok(info);
        }

        [HttpPut("contacts")]
        public async Task<ActionResult> UpdateContacts([FromBody] ShopContactInfoDto dto)
        {
            var existing = await _dataContext.ShopContactInfos.FirstOrDefaultAsync();
            if (existing == null)
            {
                existing = new ShopContactInfo();
                _dataContext.ShopContactInfos.Add(existing);
            }

            _dataContext.Entry(existing).CurrentValues.SetValues(dto);
            await _dataContext.SaveChangesAsync();
            return Ok(existing);
        }
    }
}
