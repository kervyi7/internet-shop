using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shop.Database;
using Shop.Database.Models;
using Shop.Server.Exceptions;
using Shop.Server.Models.DTO;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Shop.Server.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminCategoryController : ControllerBase
    {
        private readonly DataContext _dataContext;
        public AdminCategoryController(DataContext dataContext)
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
        public async Task<ActionResult<Category>> GetById(int id)
        {
            var category = await _dataContext.Categories
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
                        Body = x.Image.Body
                    }
                })
                .FirstOrDefaultAsync(x => x.Id == id);
            if (category == null)
            {
                throw new NotFoundException(nameof(Category), nameof(Category.Id), id);
            }
            return Ok(category);
        }

        [HttpPost()]
        public async Task<ActionResult> Create(CategoryDto model)
        {
            var user = "my user";
            var item = new Category
            {
                Image = CreateImage(model, user),
                Position = model.Position,
                Name = model.Name,
                Code = model.Code,
                CreatedByUser = user,
                UpdatedByUser = user
            };
            _dataContext.Categories.Add(item);
            await _dataContext.SaveChangesAsync();
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
            var item = await _dataContext.Categories.FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                throw new NotFoundException(nameof(Category), nameof(Category.Id), id);
            }
            item.Name = model.Name;
            item.Code = model.Code;
            item.Position = model.Position;
            item.UpdatedAt = DateTime.UtcNow;
            item.UpdatedByUser = user;
            await _dataContext.SaveChangesAsync();
            return Ok();
        }

        [HttpPatch("{id:int}")]
        public async Task<ActionResult> EditImage(int id, CategoryDto model)
        {
            var user = "my user";
            if (id != model.Id)
            {
                return BadRequest();
            }
            var item = await _dataContext.Categories.Include(x => x.Image).FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                throw new NotFoundException(nameof(Category), nameof(Category.Id), id);
            }
            item.Image = CreateImage(model, user);
            await _dataContext.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var item = await _dataContext.Categories.FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                throw new NotFoundException(nameof(Category), nameof(Category.Id), id);
            }
            _dataContext.Categories.Remove(item);
            await _dataContext.SaveChangesAsync();
            return Ok();
        }

        private Image CreateImage(CategoryDto model, string user)
        {
            return new Image
            {
                FileName = model.Image.FileName,
                FileSize = model.Image.FileSize,
                MimeType = model.Image.MimeType,
                Body = Convert.FromBase64String(model.Image.Body),
                SmallBody = string.IsNullOrEmpty(model.Image.SmallBody) ? null : Convert.FromBase64String(model.Image.SmallBody),
                CreatedByUser = user,
                UpdatedByUser = user
            };
        }
    }
}
