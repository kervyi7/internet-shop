using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shop.Database;
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
    }
}
