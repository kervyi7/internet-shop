using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shop.Database;
using Shop.Database.Models;
using Shop.Server.Controllers.Abstract;
using Shop.Server.Exceptions;
using Shop.Server.Models.DTO;
using System;
using System.Threading.Tasks;
using Shop.Server.Common;

namespace Shop.Server.Controllers.Admin
{
    [Route("api/[controller]")]
    public class AdminImageController : BaseEntityController<Image>
    {
        public AdminImageController(DataContext dataContext) : base(dataContext)
        {
        }

        [HttpGet("{page:int}")]
        public async Task<ActionResult<ImageDto[]>> GetAll(int page)
        {
            var images = await DataContext.Images.Include(x => x.Category).Include(x => x.ProductImages).ToListAsync();
            return Ok(images.ToViewModels());
        }

        [HttpPost()]
        public async Task<ActionResult> Create(ImageDto model)
        {
            var user = "my user";
            var image = CreateImage(model, user);
            DataContext.Images.Add(image);
            await DataContext.SaveChangesAsync();
            return Ok();
        }

        [HttpPut()]
        public async Task<ActionResult> Edit(ImageDto model)
        {
            var user = "my user";
            var item = await DataContext.Images.FirstOrDefaultAsync(x => x.Id == model.Id);
            if (item == null)
            {
                throw new NotFoundException(nameof(Image), nameof(Image.Id), model.ReferenceKey);//todo
            }
            item.FileName = model.FileName;
            item.FileSize = model.FileSize;
            item.MimeType = model.MimeType;
            item.Body = Convert.FromBase64String(model.Body);
            item.SmallBody = string.IsNullOrEmpty(model.SmallBody) ? null : Convert.FromBase64String(model.SmallBody);
            item.UpdatedByUser = user;
            item.UpdatedAt = DateTime.UtcNow;
            await DataContext.SaveChangesAsync();
            return Ok();
        }

        private Image CreateImage(ImageDto model, string user)
        {
            return new Image
            {
                FileName = model.FileName,
                Name = model.Name,
                FileSize = model.FileSize,
                MimeType = model.MimeType,
                Body = Convert.FromBase64String(model.Body),
                SmallBody = string.IsNullOrEmpty(model.SmallBody) ? null : Convert.FromBase64String(model.SmallBody),
                CreatedByUser = user,
                UpdatedByUser = user
            };
        }
    }
}
