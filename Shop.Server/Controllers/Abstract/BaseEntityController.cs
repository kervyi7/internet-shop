using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shop.Database.Models;
using Shop.Database;
using Shop.Server.Exceptions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Shop.Server.Controllers.Abstract
{
    [ApiController]
    public class BaseEntityController<T> : ControllerBase where T : BaseModel
    {
        protected readonly DataContext DataContext;
        public BaseEntityController(DataContext dataContext)
        {
            DataContext = dataContext;
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
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
