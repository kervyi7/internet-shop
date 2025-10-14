using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shop.Database;
using Shop.Database.Models;
using Shop.Server.Exceptions;
using Shop.Server.Models.DTO;
using System.Threading.Tasks;
using System.Linq;
using Shop.Server.Common;
using System.Collections.Generic;
using System;
using Shop.Common.Constants;

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
                .ToListAsync();
            return Ok(products.ToViewModels());
        }

        [HttpPost("category/{category}")]
        public async Task<ActionResult<PageDataDto<IEnumerable<ProductDto>>>> GetByCategory(string category, [FromBody] ProductFilterRequest model)
        {
            var query = _dataContext.Products
                .Include(x => x.Brand)
                .Include(x => x.Type)
                .Include(x => x.Category)
                .ThenInclude(x => x.PropertyTemplate)
                .Include(x => x.StringProperties)
                .Include(x => x.DecimalProperties)
                .Include(x => x.BoolProperties)
                .Include(x => x.ProductImages.Where(x => x.Image.IsTitle))
                .ThenInclude(x => x.Image)
                .Where(x => x.Category.Name == category)
                .AsQueryable();

            query = ApplyFilters(query, model);

            var totalCount = await query.CountAsync();

            var products = await query
                .OrderByDescending(x => x.Id)
                .Skip(model.Skip)
                .Take(model.Count)
                .ToListAsync();

            var response = new PageDataDto<IEnumerable<ProductDto>>
            {
                Data = products.ToViewModels(),
                Count = totalCount
            };

            return Ok(response);
        }

        [HttpGet("discounted")]
        public async Task<ActionResult<ProductDto>> GetDiscounted()
        {
            var products = await _dataContext.Products
                .Include(x => x.Category)
                .Include(x => x.ProductImages.Where(x => x.Image.IsTitle))
                .ThenInclude(x => x.Image)
                .Where(x => x.SalePrice != 0 && x.SalePrice != null)
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
                .ThenInclude(x => x.PropertyTemplate)
                .Include(x => x.StringProperties)
                .Include(x => x.DecimalProperties)
                .Include(x => x.BoolProperties)
                .Include(x => x.ProductImages)
                .ThenInclude(x => x.Image)
                .FirstOrDefaultAsync(x => x.Code == code);
            if (product == null)
            {
                throw new NotFoundException(nameof(Product), nameof(Product.Code), code);
            }
            return Ok(product.ToViewModel());
        }

        private IQueryable<Product> ApplyFilters(IQueryable<Product> query, ProductFilterRequest model)
        {
            if (model.BrandIds?.Any() == true)
                query = query.Where(p => model.BrandIds.Contains(p.Brand.Id));

            if (model.TypeIds?.Any() == true)
                query = query.Where(p => model.TypeIds.Contains(p.Type.Id));

            if (model.PriceFrom.HasValue)
                query = query.Where(p => p.Price >= model.PriceFrom.Value);

            if (model.PriceTo.HasValue)
                query = query.Where(p => p.Price <= model.PriceTo.Value);

            foreach (var filter in model.Properties)
                query = ApplyPropertyFilter(query, filter);

            return query;
        }

        private IQueryable<Product> ApplyPropertyFilter(IQueryable<Product> query, PropertyFilterDto filter)
        {
            switch (filter.Type)
            {
                case PropertyTypes.String:
                    return query.Where(p =>
                        p.StringProperties.Any(sp => sp.Name == filter.Name && filter.Values.Contains(sp.Value)));
                case PropertyTypes.Number:
                    if (filter.Values.Count == 2)
                    {
                        var min = decimal.Parse(filter.Values[0]);
                        var max = decimal.Parse(filter.Values[1]);
                        return query.Where(p =>
                            p.DecimalProperties.Any(dp => dp.Name == filter.Name && dp.Value >= min && dp.Value <= max));
                    }
                    else
                    {
                        var decimalValues = filter.Values.Select(decimal.Parse).ToList();
                        return query.Where(p =>
                            p.DecimalProperties.Any(dp => dp.Name == filter.Name && decimalValues.Contains(dp.Value)));
                    }
                case PropertyTypes.Bool:
                    var boolValues = filter.Values.Select(bool.Parse).ToList();
                    return query.Where(p =>
                        p.BoolProperties.Any(bp => bp.Name == filter.Name && boolValues.Contains(bp.Value)));
            }
            return query;
        }
    }
}
