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
                .Include(x => x.IntProperties.Where(x => x.IsTitle))
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
                .Include(x => x.Category)
                .Include(x => x.StringProperties)
                .Include(x => x.IntProperties)
                .Include(x => x.BoolProperties)
                .Include(x => x.DateProperties)
                .Include(x => x.ProductImages)
                .ThenInclude(x => x.Image)
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
            var item = new Product
            {
                CategoryId = model.CategoryId,
                Name = model.Name,
                Code = model.Code,
                TypeId = model.TypeId,
                BrandId = model.BrandId,
                Price = model.Price,
                Currency = model.Currency,
                CreatedByUser = user,
                UpdatedByUser = user
            };
            DataContext.Products.Add(item);
            await DataContext.SaveChangesAsync();
            return Ok(new BaseDto
            {
                Id = item.Id
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
            DataContext.ProductImages.Add(new ProductImage
            {
                ProductId = model.ReferenceKey,
                Image = image
            });
            await DataContext.SaveChangesAsync();
            return Ok();
        }

        [HttpPost($"add-property/{PropertyTypes.String}")]
        public async Task<ActionResult> AddPropertyString(PropertyDto<string> model)
        {
            await AddProperty(model);
            return Ok();
        }

        [HttpPost($"add-property/{PropertyTypes.Number}")]
        public async Task<ActionResult> AddPropertyInt(PropertyDto<int> model)
        {
            await AddProperty(model);
            return Ok();
        }

        [HttpPost($"add-property/{PropertyTypes.Bool}")]
        public async Task<ActionResult> AddPropertyBool(PropertyDto<bool> model)
        {
            await AddProperty(model);
            return Ok();
        }

        [HttpPost($"add-property/{PropertyTypes.Date}")]
        public async Task<ActionResult> AddPropertyDate(PropertyDto<DateTime> model)
        {
            await AddProperty(model);
            return Ok();
        }

        [HttpPut($"edit-property/{PropertyTypes.String}/" + "{id:int}")]
        public async Task<ActionResult> EditPropertyString(int id, PropertyDto<string> model)
        {
            await EditProperty(id, model);
            return Ok();
        }

        [HttpPut($"edit-property/{PropertyTypes.Number}/" + "{id:int}")]
        public async Task<ActionResult> EditPropertyInt(int id, PropertyDto<int> model)
        {
            await EditProperty(id, model);
            return Ok();
        }

        [HttpPut($"edit-property/{PropertyTypes.Bool}/"+"{id:int}")]
        public async Task<ActionResult> EditPropertyBool(int id, PropertyDto<bool> model)
        {
            await EditProperty(id, model);
            return Ok();
        }

        [HttpPut($"edit-property/{PropertyTypes.Date}/"+"{id:int}")]
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

        [HttpDelete("remove-property/{id:int}/property/{propertyId:int}/type/{type}")]
        public async Task<ActionResult> DeleteProperty(int id, int propertyId, string type)
        {
            var result = await GetPropertyListByType(type, DataContext).AnyAsync(x => x.Id == propertyId && x.ProductId == id);
            if (!result)
            {
                throw new ConflictException("not reference");
            }
            await GetPropertyListByType(type, DataContext).Where(x => x.Id == propertyId).ExecuteDeleteAsync();
            return Ok();
        }

        private IQueryable<BaseProperty> GetPropertyListByType(string type, DataContext dataContext)
        {
            switch (type)
            {
                case PropertyTypes.String:
                    return dataContext.StringProperties;
                case PropertyTypes.Number:
                    return dataContext.IntProperties;
                case PropertyTypes.Bool:
                    return dataContext.BoolProperties;
                case PropertyTypes.Date:
                    return dataContext.DateProperties;
                default:
                    throw new ConflictException("not reference");
            }
        }

        private Image CreateImage(ImageDto model, string user)
        {
            return new Image
            {
                FileName = model.FileName,//todo fix(in category and product same func)
                Name = model.Name,
                FileSize = model.FileSize,
                MimeType = model.MimeType,
                Body = Convert.FromBase64String(model.Body),
                SmallBody = string.IsNullOrEmpty(model.SmallBody) ? null : Convert.FromBase64String(model.SmallBody),
                CreatedByUser = user,
                UpdatedByUser = user,
            };
        }

        private async Task AddProperty<T>(PropertyDto<T> model)
        {
            var user = "user";
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
            var newProperty = new Property<T>
            {
                ProductId = model.ProductId,
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
            DataContext.Set<Property<T>>().Add(newProperty);
            await DataContext.SaveChangesAsync();
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
