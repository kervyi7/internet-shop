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
using Shop.Common.Enums;

namespace Shop.Server.Controllers.Admin
{
    [Route("api/[controller]")]
    public class AdminProductController : BaseEntityController<Product>
    {
        public AdminProductController(DataContext dataContext) : base(dataContext)
        {
        }

        [HttpGet()]
        public async Task<ActionResult<Product[]>> GetAll()
        {
            var products = await DataContext.Products
                .Include(x => x.Brand)
                .Include(x => x.Type)
                .Include(x => x.StringProperties.Where(x => x.IsTitle))
                .Include(x => x.IntProperties.Where(x => x.IsTitle))
                .Include(x => x.BoolProperties.Where(x => x.IsTitle))
                .Include(x => x.DateProperties.Where(x => x.IsTitle))
                .ToListAsync();
            return Ok(products);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Product>> GetById(int id)
        {
            var product = await DataContext.Products
                .Include(x => x.Brand)
                .Include(x => x.Type)
                .Include(x => x.StringProperties)
                .Include(x => x.IntProperties)
                .Include(x => x.BoolProperties)
                .Include(x => x.DateProperties)
                .FirstOrDefaultAsync(x => x.Id == id);
            if (product == null)
            {
                throw new NotFoundException(nameof(Product), nameof(Product.Id), id);
            }
            return Ok(product);
        }

        [HttpPost()]
        public async Task<ActionResult> Create(ProductDto model)
        {
            var user = "my user";
            var item = new Product
            {
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
            return Ok();
        }

        [HttpPost("add-image")]
        public async Task<ActionResult> AddImage(ImageDto model)
        {
            var user = "my user";
            var isExist = await DataContext.Products.AnyAsync(x => x.Id == model.ReferenceKey);
            if (!isExist)
            {
                throw new NotFoundException(nameof(Product), nameof(Product.Id), model.ReferenceKey);
            }
            var image = CreateImage(model, user);
            DataContext.Images.Add(image);
            DataContext.ProductImages.Add(new ProductImage
            {
                ProductId = model.ReferenceKey,
                ImageId = image.Id
            });
            await DataContext.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("add-property/string")]
        public async Task<ActionResult> AddPropertyString(PropertyDto<string> model)
        {
            await AddProperty(model);
            return Ok();
        }

        [HttpPost("add-property/int")]
        public async Task<ActionResult> AddPropertyString(PropertyDto<int> model)
        {
            await AddProperty(model);
            return Ok();
        }

        [HttpPost("add-property/bool")]
        public async Task<ActionResult> AddPropertyString(PropertyDto<bool> model)
        {
            await AddProperty(model);
            return Ok();
        }

        [HttpPost("add-property/date")]
        public async Task<ActionResult> AddPropertyString(PropertyDto<DateTime> model)
        {
            await AddProperty(model);
            return Ok();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Edit(int id, ProductDto model)
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

        [HttpDelete("remove-property/{id:int}/property/{propertyId:int}/type/{type:int}")]
        public async Task<ActionResult> DeleteProperty(int id, int propertyId, int type)
        {
            var item = ExistPropertyByType(type, propertyId, DataContext.Products).FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                throw new ConflictException("not reference");
            }
            await DeletePropertyByType(type, propertyId, DataContext).ExecuteDeleteAsync();
            return Ok();
        }

        private IQueryable<Product> ExistPropertyByType(int type, int propertyId, IQueryable<Product> products)
        {
            switch (type)
            {
                case (int)PropertyTypes.String:
                    return products.Include(x => x.StringProperties).Where(x => x.StringProperties.Any(p => p.Id == propertyId));
                case (int)PropertyTypes.Int:
                    return products.Include(x => x.IntProperties).Where(x => x.IntProperties.Any(p => p.Id == propertyId));
                case (int)PropertyTypes.Bool:
                    return products.Include(x => x.BoolProperties).Where(x => x.BoolProperties.Any(p => p.Id == propertyId));
                case (int)PropertyTypes.Date:
                    return products.Include(x => x.DateProperties).Where(x => x.DateProperties.Any(p => p.Id == propertyId));
                default:
                    throw new ConflictException("not reference");
            }
        }

        private IQueryable<BaseModel> DeletePropertyByType(int type, int propertyId, DataContext dataContext)
        {
            switch (type)
            {
                case (int)PropertyTypes.String:
                    return dataContext.StringProperties.Where(x => x.Id == propertyId);
                case (int)PropertyTypes.Int:
                    return dataContext.IntProperties.Where(x => x.Id == propertyId);
                case (int)PropertyTypes.Bool:
                    return dataContext.BoolProperties.Where(x => x.Id == propertyId);
                case (int)PropertyTypes.Date:
                    return dataContext.DateProperties.Where(x => x.Id == propertyId);
                default:
                    throw new ConflictException("not reference");
            }
        }

        private Image CreateImage(ImageDto model, string user)
        {
            return new Image
            {
                FileName = model.FileName,
                FileSize = model.FileSize,
                MimeType = model.MimeType,
                Body = Convert.FromBase64String(model.Body),
                SmallBody = string.IsNullOrEmpty(model.SmallBody) ? null : Convert.FromBase64String(model.SmallBody),
                CreatedByUser = user,
                UpdatedByUser = user
            };
        }

        private async Task AddProperty<T>(PropertyDto<T> model)
        {
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
                Value = model.Value
            };
            DataContext.Set<Property<T>>().Add(newProperty);
            await DataContext.SaveChangesAsync();
        }
    }
}
