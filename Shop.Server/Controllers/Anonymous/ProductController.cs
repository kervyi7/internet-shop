using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shop.Database;
using Shop.Database.Models;
using Shop.Server.Exceptions;
using Shop.Server.Models.DTO;
using System.Threading.Tasks;
using System.Linq;
using Shop.Server.Common;

namespace Shop.Server.Controllers.Admin
{
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly DataContext _dataContext;
        public ProductController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet()]
        public async Task<ActionResult<ProductDto[]>> GetAll()
        {
            var products = await _dataContext.Products
                .Include(x => x.Brand)
                .Include(x => x.Type)
                .Include(x => x.Category)
                .Include(x => x.StringProperties.Where(x => x.IsTitle))
                .Include(x => x.DecimalProperties.Where(x => x.IsTitle))
                .Include(x => x.BoolProperties.Where(x => x.IsTitle))
                .Include(x => x.DateProperties.Where(x => x.IsTitle))
                .ToListAsync();
            return Ok(products.ToViewModels());
        }

        [HttpGet("category/{category}")]
        public async Task<ActionResult<ProductDto[]>> GetByCategory(string category)
        {
            var products = await _dataContext.Products
                .Include(x => x.Brand)
                .Include(x => x.Type)
                .Include(x => x.Category)
                .Include(x => x.StringProperties.Where(x => x.IsTitle))
                .Include(x => x.DecimalProperties.Where(x => x.IsTitle))
                .Include(x => x.BoolProperties.Where(x => x.IsTitle))
                .Include(x => x.DateProperties.Where(x => x.IsTitle))
                .Include(x => x.ProductImages.Where(x => x.Image.IsTitle))
                .ThenInclude(x => x.Image)
                .Where(x => x.Category.Name == category)
                .ToListAsync();
            return Ok(products.ToViewModels());
        }

        [HttpGet("category/{category}/filters")]
        public async Task<ActionResult<ProductDto[]>> GetByFilters(string category)
        {
            var products = await _dataContext.Products
                .Include(x => x.Brand)
                .Include(x => x.Type)
                .Include(x => x.Category)
                .Include(x => x.StringProperties.Where(x => x.IsTitle))
                .Include(x => x.DecimalProperties.Where(x => x.IsTitle))
                .Include(x => x.BoolProperties.Where(x => x.IsTitle))
                .Include(x => x.DateProperties.Where(x => x.IsTitle))
                .Include(x => x.ProductImages.Where(x => x.Image.IsTitle))
                .ThenInclude(x => x.Image).Where(x => x.Category.Name == category)
                .ToListAsync();
            return Ok(products.ToViewModels());
        }

        [HttpGet("discounted")]
        public async Task<ActionResult<ProductDto>> GetDiscounted()
        {
            var products = await _dataContext.Products
                .Include(x => x.Category)
                .Include(x => x.ProductImages.Where(x => x.Image.IsTitle))
                .ThenInclude(x => x.Image)
                .Where(x => x.SalePrice != 0)
                .ToListAsync();
            return Ok(products.ToViewModels());
        }

        [HttpGet("product/{code}")]
        public async Task<ActionResult<ProductDto>> GetByCode(string code)
        {
            var product = await _dataContext.Products
                .Include(x => x.Brand)
                .Include(x => x.Type)
                .Include(x => x.Category)
                .Include(x => x.StringProperties)
                .Include(x => x.DecimalProperties)
                .Include(x => x.BoolProperties)
                .Include(x => x.DateProperties)
                .Include(x => x.ProductImages)
                .ThenInclude(x => x.Image)
                .FirstOrDefaultAsync(x => x.Code == code);
            if (product == null)
            {
                throw new NotFoundException(nameof(Product), nameof(Product.Code), code);
            }
            return Ok(product.ToViewModel());
        }
    }
}
