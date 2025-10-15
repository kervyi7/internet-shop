using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shop.Common.Constants;
using Shop.Database;
using Shop.Database.Models;
using Shop.Server.Models.DTO;
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
                .Include(x => x.Products)
                .Include(x => x.PropertyTemplate)
                .Where(x => x.Image != null && x.PropertyTemplate != null && x.Products.Any())
                .Select(x => new Category
                {
                    Id = x.Id,
                    Name = x.Name,
                    Code = x.Code,
                    Position = x.Position,
                    Image = new Image
                    {
                        MimeType = x.Image.MimeType,
                        SmallBody = x.Image.SmallBody,
                    }
                }).ToListAsync();
            return Ok(categories);
        }

        [HttpGet("filters/{categoryName}")]
        public async Task<ActionResult<CategoryFiltersDto>> GetCategoryFilters(string categoryName)
        {
            var productsQuery = _dataContext.Products
                .Where(p => p.Category.Name == categoryName);

            var brands = await productsQuery
                .Where(p => p.Brand != null)
                .Select(p => new CodeNameDto
                {
                    Id = p.Brand.Id,
                    Name = p.Brand.Name
                })
                .Distinct()
                .ToListAsync();

            var types = await productsQuery
                .Where(p => p.Type != null)
                .Select(p => new CodeNameDto
                {
                    Id = p.Type.Id,
                    Name = p.Type.Name
                })
                .Distinct()
                .ToListAsync();

            var minPrice = await productsQuery.MinAsync(p => (decimal?)p.DiscountedPrice);
            var maxPrice = await productsQuery.MaxAsync(p => (decimal?)p.Price);

            var stringPropsRaw = await _dataContext.StringProperties
                .Where(sp => sp.Product.Category.Name == categoryName)
                .GroupBy(sp => sp.Name)
                .Select(g => new { Name = g.Key, Values = g.Select(x => x.Value) })
                .ToListAsync();

            var stringProps = stringPropsRaw
                .Select(g => new PropertyFilterDto
                {
                    Name = g.Name,
                    Type = PropertyTypes.String,
                    Values = g.Values.Distinct().ToList()
                })
                .ToList();

            var decimalPropsRaw = await _dataContext.DecimalProperties
                .Where(dp => dp.Product.Category.Name == categoryName)
                .GroupBy(dp => dp.Name)
                .Select(g => new { Name = g.Key, Values = g.Select(x => x.Value) })
                .ToListAsync();

            var decimalProps = decimalPropsRaw
                .Select(g => new PropertyFilterDto
                {
                    Name = g.Name,
                    Type = PropertyTypes.Number,
                    Values = g.Values.Distinct().Select(v => v.ToString()).ToList()
                })
                .ToList();

            var boolPropsRaw = await _dataContext.BoolProperties
                .Where(bp => bp.Product.Category.Name == categoryName)
                .GroupBy(bp => bp.Name)
                .Select(g => new { Name = g.Key, Values = g.Select(x => x.Value) })
                .ToListAsync();

            var boolProps = boolPropsRaw
                .Select(g => new PropertyFilterDto
                {
                    Name = g.Name,
                    Type = PropertyTypes.Bool,
                    Values = g.Values.Distinct().Select(v => v.ToString()).ToList()
                })
                .ToList();

            var filters = new CategoryFiltersDto
            {
                Brands = brands,
                Types = types,
                MinPrice = minPrice,
                MaxPrice = maxPrice,
                Properties = stringProps
                    .Concat(decimalProps)
                    .Concat(boolProps)
                    //.Concat(dateProps)
                    .ToList()
            };

            return Ok(filters);
        }
    }
}
