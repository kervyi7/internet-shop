using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shop.Database;
using Shop.Database.Models;
using Shop.Server.Controllers.Abstract;
using Shop.Server.Exceptions;
using Shop.Server.Models.DTO;
using System.Threading.Tasks;
using System;
using System.Linq;
using Shop.Server.Common;
using Shop.Common.Constants;
using System.Collections.Generic;

namespace Shop.Server.Controllers.Admin
{
    [Route("api/[controller]")]
    public class AdminProductController : BaseEntityController<Product>
    {
        public AdminProductController(DataContext dataContext) : base(dataContext)
        {
        }

        [HttpGet()]
        public async Task<ActionResult<ProductDto[]>> GetAll()
        {
            var products = await DataContext.Products
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

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ProductDto>> GetById(int id)
        {
            var product = await DataContext.Products
                .Include(x => x.Brand)
                .Include(x => x.Type)
                .Include(x => x.StringProperties)
                .Include(x => x.DecimalProperties)
                .Include(x => x.BoolProperties)
                .Include(x => x.DateProperties)
                .Include(x => x.ProductImages)
                .ThenInclude(x => x.Image)
                .Include(x => x.Category)
                .ThenInclude(x => x.PropertyTemplate)
                .FirstOrDefaultAsync(x => x.Id == id);
            if (product == null)
            {
                throw new NotFoundException(nameof(Product), nameof(Product.Id), id);
            }
            return Ok(product.ToViewModel());
        }

        [HttpPost()]
        public async Task<ActionResult> Create(CreateProductDto model)
        {
            var user = "my user";
            var template = await DataContext.PropertyTemplate
                .Include(x => x.StringProperties)
                .Include(x => x.DecimalProperties)
                .Include(x => x.BoolProperties)
                .Include(x => x.DateProperties)
                .FirstOrDefaultAsync(x => x.CategoryId == model.CategoryId);
            var item = new Product
            {
                CategoryId = model.CategoryId,
                Name = model.Name,
                Code = model.Code,
                TypeId = model.TypeId,
                BrandId = model.BrandId,
                SalePrice = model.SalePrice,
                Description = model.Description,
                Count = model.Count,
                Price = model.Price,
                Currency = model.Currency,
                CreatedByUser = user,
                UpdatedByUser = user
            };
            DataContext.Products.Add(item);
            var transaction = DataContext.Database.BeginTransaction();
            await DataContext.SaveChangesAsync();
            AddPropertiesByTamplate(template.StringProperties, item, user);
            AddPropertiesByTamplate(template.DecimalProperties, item, user);
            AddPropertiesByTamplate(template.BoolProperties, item, user);
            AddPropertiesByTamplate(template.DateProperties, item, user);
            await DataContext.SaveChangesAsync();
            transaction.Commit();

            return Ok(new CreateProductResponse
            {
                Id = item.Id,
                PropertyTemplate = Extensions.CreatePropertyTemplateDto(template)
            });
        }

        [HttpPost("add-image")]
        public async Task<ActionResult> AddImage(ImageDto model)
        {
            var user = "my user";
            var isProductExist = await DataContext.Products.AnyAsync(x => x.Id == model.ReferenceKey);
            if (!isProductExist)
            {
                throw new NotFoundException(nameof(Product), nameof(Product.Id), model.ReferenceKey);
            }
            var image = await DataContext.Images.FirstOrDefaultAsync(x => x.Id == model.Id);
            image.IsTitle = model.IsTitle;
            DataContext.ProductImages.Add(new ProductImage
            {
                ProductId = model.ReferenceKey,
                Image = image
            });
            await DataContext.SaveChangesAsync();
            return Ok();
        }

        [HttpPut($"edit-property/{PropertyTypes.String}/" + "{id:int}")]
        public async Task<ActionResult> EditPropertyString(int id, PropertyDto<string> model)
        {
            await EditProperty(id, model);
            return Ok();
        }

        [HttpPut($"edit-property/{PropertyTypes.Number}/" + "{id:int}")]
        public async Task<ActionResult> EditPropertyInt(int id, PropertyDto<decimal> model)
        {
            await EditProperty(id, model);
            return Ok();
        }

        [HttpPut($"edit-property/{PropertyTypes.Bool}/" + "{id:int}")]
        public async Task<ActionResult> EditPropertyBool(int id, PropertyDto<bool> model)
        {
            await EditProperty(id, model);
            return Ok();
        }

        [HttpPut($"edit-property/{PropertyTypes.Date}/" + "{id:int}")]
        public async Task<ActionResult> EditPropertyDate(int id, PropertyDto<DateTime> model)
        {
            await EditProperty(id, model);
            return Ok();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Edit(int id, CreateProductDto model)
        {
            var user = "my user";
            if (id != model.Id)
            {
                return BadRequest();
            }
            var item = await DataContext.Products.FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                throw new NotFoundException(nameof(Product), nameof(Product.Id), id);
            }
            item.Name = model.Name;
            item.Code = model.Code;
            item.TypeId = model.TypeId;
            item.BrandId = model.BrandId;
            item.SalePrice = model.SalePrice;
            item.Description = model.Description;
            item.Count = model.Count;
            item.Price = model.Price;
            item.Currency = model.Currency;
            item.UpdatedAt = DateTime.UtcNow;
            item.UpdatedByUser = user;
            await DataContext.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("remove-image/{id:int}/image/{imageId:int}")]
        public async Task<ActionResult> DeleteImage(int id, int imageId)
        {
            var item = await DataContext.ProductImages.FirstOrDefaultAsync(x => x.ProductId == id && x.ImageId == imageId);
            if (item == null)
            {
                throw new ConflictException("not reference");
            }
            var isReference = await DataContext.ProductImages.AnyAsync(x => x.ImageId == imageId && x.Id != item.Id);
            if (!isReference)
            {
                await DataContext.Images.Where(x => x.Id == imageId).ExecuteDeleteAsync();
            }
            else
            {
                DataContext.ProductImages.Remove(item);
                await DataContext.SaveChangesAsync();
            }
            return Ok();
        }

        private IQueryable<BaseProperty> GetPropertyListByType(string type, DataContext dataContext)
        {
            switch (type)
            {
                case PropertyTypes.String:
                    return dataContext.StringProperties;
                case PropertyTypes.Number:
                    return dataContext.DecimalProperties;
                case PropertyTypes.Bool:
                    return dataContext.BoolProperties;
                case PropertyTypes.Date:
                    return dataContext.DateProperties;
                default:
                    throw new ConflictException("not reference");
            }
        }

        private async Task AddProperty<T>(Property<T> model, int productId)
        {
            var user = "user";
            model.Id = 0;
            model.ProductId = productId;
            var isProductExist = await DataContext.Products.AnyAsync(x => x.Id == model.ProductId);
            if (!isProductExist)
            {
                throw new ConflictException("not reference");
            }
            var isPropertyExist = await DataContext.Set<Property<T>>()
                .AnyAsync(x => x.ProductId == model.ProductId && (x.Code == model.Code || x.Name == model.Name));
            if (isPropertyExist)
            {
                throw new ConflictException("property already exist");
            }
            DataContext.Set<Property<T>>().Add(model);
            await DataContext.SaveChangesAsync();
        }

        private void AddPropertiesByTamplate<T>(IEnumerable<Property<T>> models, Product product, string user)
        {
            foreach (var model in models)
            {
                var property = new Property<T>
                {
                    ProductId = product.Id,
                    IsPrimary = model.IsPrimary,
                    Name = model.Name,
                    Code = model.Code,
                    IsTitle = model.IsTitle,
                    Description = model.Description,
                    Suffix = model.Suffix,
                    Value = model.Value,
                    CreatedByUser = user,
                    UpdatedByUser = user
                };
                DataContext.Set<Property<T>>().Add(property);
            }
        }

        private async Task EditProperty<T>(int id, PropertyDto<T> model)
        {
            var user = "my user";
            var isProductExist = await DataContext.Products.AnyAsync(x => x.Id == model.ProductId);
            if (!isProductExist)
            {
                throw new ConflictException("not reference");
            }
            var item = await DataContext.Set<Property<T>>().FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                throw new NotFoundException(nameof(Property<T>), nameof(Property<T>.Id), id);
            }
            item.ProductId = model.ProductId;
            item.IsPrimary = model.IsPrimary;
            item.Name = model.Name;
            item.Code = model.Code;
            item.IsTitle = model.IsTitle;
            item.Description = model.Description;
            item.Suffix = model.Suffix;
            item.Value = model.Value;
            item.CreatedByUser = user;
            item.UpdatedByUser = user;
            await DataContext.SaveChangesAsync();
        }
    }
}
