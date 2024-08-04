using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shop.Common.Constants;
using Shop.Database;
using Shop.Database.Models;
using Shop.Server.Common;
using Shop.Server.Controllers.Abstract;
using Shop.Server.Exceptions;
using Shop.Server.Manager;
using Shop.Server.Models;
using Shop.Server.Models.DTO;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Shop.Server.Controllers.Admin
{
    [Route("api/[controller]")]
    public class AdminCategoryController : BaseEntityController<Category>
    {

        public AdminCategoryController(DataContext dataContext) : base(dataContext)
        {
        }

        [HttpGet()]
        public async Task<ActionResult<Category[]>> GetAll()
        {
            var categories = await DataContext.Categories
                .Include(x => x.Image)
                .Select(x => new Category
                {
                    Id = x.Id,
                    Name = x.Name,
                    Code = x.Code,
                    Position = x.Position,
                    CreatedAt = x.CreatedAt,
                    UpdatedAt = x.UpdatedAt,
                    CreatedByUser = x.CreatedByUser,
                    UpdatedByUser = x.UpdatedByUser,
                    Image = new Image
                    {
                        FileName = x.Image.FileName,
                        MimeType = x.Image.MimeType,
                        SmallBody = x.Image.SmallBody
                    }
                }).ToListAsync();
            return Ok(categories);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<CategoryDto>> GetById(int id)
        {
            var category = await DataContext.Categories
                .Include(x => x.Image)
                .Include(x => x.PropertyTemplate).ThenInclude(x => x.StringProperties.Where(x => x.ProductId == null))
                .Include(x => x.PropertyTemplate).ThenInclude(x => x.DecimalProperties.Where(x => x.ProductId == null))
                .Include(x => x.PropertyTemplate).ThenInclude(x => x.BoolProperties.Where(x => x.ProductId == null))
                .Include(x => x.PropertyTemplate).ThenInclude(x => x.DateProperties.Where(x => x.ProductId == null))
                .FirstOrDefaultAsync(x => x.Id == id);
            if (category == null)
            {
                throw new NotFoundException(nameof(CategoryDto), nameof(CategoryDto.Id), id);
            }
            return Ok(category.ToViewModel());
        }

        [HttpPost()]
        public async Task<ActionResult> Create(CategoryDto model)
        {
            var user = "my user";
            var item = new Category
            {
                Position = model.Position,
                Name = model.Name,
                Code = model.Code,
                CreatedByUser = user,
                UpdatedByUser = user
            };
            DataContext.Categories.Add(item);
            await DataContext.SaveChangesAsync();
            return Ok(new BaseDto
            {
                Id = item.Id
            });
        }

        [HttpPost("edit-image/{id:int}")]
        public async Task<ActionResult> AddImage(int id, ImageDto model)
        {
            var user = "my user";
            var isCategoryExist = await DataContext.Categories.AnyAsync(x => x.Id == model.ReferenceKey);
            if (!isCategoryExist)
            {
                throw new NotFoundException(nameof(Product), nameof(Product.Id), model.ReferenceKey);
            }
            var item = await DataContext.Categories.FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                throw new NotFoundException(nameof(Category), nameof(Category.Id), id);
            }
            var image = await DataContext.Images.FirstOrDefaultAsync(x => x.Id == model.Id);
            item.Image = image;
            await DataContext.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("add-template")]
        public async Task<ActionResult> CreateTemplate(PropertyTemplateDto model)
        {
            var user = "my user";
            var item = new PropertyTemplate
            {
                Name = model.Name,
                Code = model.Code,
                CreatedByUser = user,
                UpdatedByUser = user,
                Extension = "",
                CategoryId = model.CategoryId,
            };
            DataContext.PropertyTemplate.Add(item);
            await DataContext.SaveChangesAsync();
            return Ok(new BaseDto
            {
                Id = item.Id
            });
        }

        [HttpPut("edit-template/{id:int}")]
        public async Task<ActionResult> EditTemplate(int id, PropertyTemplateDto model)
        {
            var user = "my user";
            var item = await DataContext.PropertyTemplate.FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                throw new NotFoundException(nameof(PropertyTemplate), nameof(PropertyTemplate.Id), id);
            }
            item.Extension = JsonManager.Serialize(model.Extension);
            item.Code = model.Code;
            item.Name = model.Name;
            await DataContext.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Edit(int id, CategoryDto model)
        {
            var user = "my user";
            if (id != model.Id)
            {
                return BadRequest();
            }
            var item = await DataContext.Categories.FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                throw new NotFoundException(nameof(Category), nameof(Category.Id), id);
            }
            var image = await DataContext.Images.FirstOrDefaultAsync(x => x.Id == model.Image.Id);
            item.Image = image;
            item.Name = model.Name;
            item.Code = model.Code;
            item.Position = model.Position;
            item.UpdatedAt = DateTime.UtcNow;
            item.UpdatedByUser = user;
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
        public async Task<ActionResult> AddPropertyInt(PropertyDto<decimal> model)
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

        [HttpDelete("remove-property/{id:int}/property/{propertyId:int}/type/{type}")]
        public async Task<ActionResult> DeleteProperty(int id, int propertyId, string type)
        {
            var result = await GetPropertyListByType(type, DataContext).AnyAsync(x => x.Id == propertyId && x.PropertyTemplateId == id);
            if (!result)
            {
                throw new ConflictException("not reference");
            }
            var isProductExist = await GetPropertyListByType(type, DataContext).AnyAsync(x => x.ProductId != null);
            if (isProductExist)
            {
                throw new ConflictException("cannot delete when product exist");
            }
            await GetPropertyListByType(type, DataContext).Where(x => x.Id == propertyId && x.PropertyTemplateId == id).ExecuteDeleteAsync();
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

        private async Task AddProperty<T>(PropertyDto<T> model)
        {
            var user = "user";
            var isTemplateExist = await DataContext.PropertyTemplate.AnyAsync(x => x.Id == model.PropertyTemplateId);
            if (!isTemplateExist)
            {
                throw new ConflictException("not reference");
            }
            var isPropertyExist = await DataContext.Set<Property<T>>()
                .AnyAsync(x => x.PropertyTemplateId == model.PropertyTemplateId && (x.Code == model.Code || x.Name == model.Name));
            if (isPropertyExist)
            {
                throw new ConflictException("property already exist");
            }
            var newProperty = new Property<T>
            {
                ProductId = model.ProductId,
                PropertyTemplateId = model.PropertyTemplateId,
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
            var isTemplateExist = await DataContext.PropertyTemplate.AnyAsync(x => x.Id == model.PropertyTemplateId);
            if (!isTemplateExist)
            {
                throw new ConflictException("not reference");
            }
            var item = await DataContext.Set<Property<T>>().FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                throw new NotFoundException(nameof(Property<T>), nameof(Property<T>.Id), id);
            }
            var isProductExist = await DataContext.Products.AnyAsync(x => x.Id == model.ProductId);
            if (isProductExist)
            {
                throw new ConflictException("Product is exist");
            }
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
