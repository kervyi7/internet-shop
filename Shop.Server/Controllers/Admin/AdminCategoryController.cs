using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shop.Database;
using Shop.Database.Models;
using Shop.Server.Controllers.Abstract;
using Shop.Server.Exceptions;
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
                .Select(x => new CategoryDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    Code = x.Code,
                    Position = x.Position,
                    Image = new ImageDto
                    {
                        Id = x.Image.Id,
                        FileName = x.Image.FileName,
                        MimeType = x.Image.MimeType,
                        Body = Convert.ToBase64String(x.Image.Body),
                        SmallBody = Convert.ToBase64String(x.Image.SmallBody),
                        ReferenceKey = x.Id
                    }
                })
                .FirstOrDefaultAsync(x => x.Id == id);
            if (category == null)
            {
                throw new NotFoundException(nameof(CategoryDto), nameof(CategoryDto.Id), id);
            }
            return Ok(category);
        }

        [HttpPost()]
        public async Task<ActionResult> Create(CategoryDto model)
        {
            var user = "my user";
            var image = await DataContext.Images.FirstOrDefaultAsync(x => x.Id == model.Image.Id);
            var item = new Category
            {
                Image = image,
                Position = model.Position,
                Name = model.Name,
                Code = model.Code,
                CreatedByUser = user,
                UpdatedByUser = user
            };
            DataContext.Categories.Add(item);
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
    }
}
