using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shop.Database;
using Shop.Database.Models;
using System.Linq;
using System.Threading.Tasks;

namespace Shop.Server.Controllers.Admin
{
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly DataContext _dataContext;
        public CategoryController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet()]
        public async Task<ActionResult<Category[]>> GetAll()
        {
            var categories = await _dataContext.Categories
                .Include(x => x.Image)
                .Select(x => new Category
                {
                    Id = x.Id,
                    Name = x.Name,
                    Code = x.Code,
                    Position = x.Position,
                    Image = new Image
                    {
                        FileName = x.Image.FileName,
                        MimeType = x.Image.MimeType,
                        SmallBody = x.Image.SmallBody
                    }
                }).ToListAsync();
            return Ok(categories);
        }
    }
}
