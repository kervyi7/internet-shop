using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shop.Database;
using Shop.Database.Models;
using Shop.Server.Exceptions;
using Shop.Server.Models.DTO;
using System.Threading.Tasks;
using System;

namespace Shop.Server.Controllers.Abstract
{
    [ApiController]
    public abstract class BaseCodeNameController<T> : ControllerBase where T : BaseCodeName, new()
    {
        protected readonly DataContext DataContext;
        public BaseCodeNameController(DataContext dataContext)
        {
            DataContext = dataContext;
        }

        protected abstract Task<bool> IsCanDelete(int id);

        [HttpGet()]
        public async Task<ActionResult<T>> GetAll()
        {
            var items = await DataContext.Set<T>().ToListAsync();
            return Ok(items);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<T>> GetById(int id)
        {
            var item = await DataContext.Set<T>().FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                throw new NotFoundException(nameof(T), nameof(BaseCodeName.Id), id);
            }
            return Ok(item);
        }

        [HttpPost()]
        public async Task<ActionResult> Create(CodeNameDto model)
        {
            var user = "my user";
            var item = new T
            {
                Name = model.Name,
                Code = model.Code,
                CreatedByUser = user,
                UpdatedByUser = user
            };
            DataContext.Set<T>().Add(item);
            await DataContext.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Edit(int id, CodeNameDto model)
        {
            var user = "my user";
            if (id != model.Id)
            {
                return BadRequest();
            }
            var item = await DataContext.Set<T>().FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                throw new NotFoundException(nameof(T), nameof(BaseCodeName.Id), id);
            }
            item.Name = model.Name;
            item.Code = model.Code;
            item.UpdatedAt = DateTime.UtcNow;
            item.UpdatedByUser = user;
            await DataContext.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var canDelete = await IsCanDelete(id);
            if (canDelete)
            {
                throw new ConflictException("model is has reference");
            }
            var item = await DataContext.Set<T>().FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                throw new NotFoundException(nameof(T), nameof(BaseCodeName.Id), id);
            }
            DataContext.Set<T>().Remove(item);
            await DataContext.SaveChangesAsync();
            return Ok();
        }
    }
}
