using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shop.Database;
using Shop.Database.Models;
using Shop.Server.Common;
using Shop.Server.Models.DTO;
using System.Linq;
using System.Threading.Tasks;

namespace Shop.Server.Controllers.Anonymous
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteProductsController : ControllerBase
    {
        private readonly DataContext _dataContext;
        public FavoriteProductsController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<FavoriteProductDto[]>> GetAll(string userId)
        {
            var favorites = await _dataContext.FavoriteProducts
                .Where(f => f.UserId == userId)
                .Include(f => f.Product)
                    .ThenInclude(p => p.Brand)
                .Include(f => f.Product)
                    .ThenInclude(p => p.Type)
                .Include(f => f.Product)
                    .ThenInclude(p => p.Category)
                .Include(f => f.Product)
                    .ThenInclude(p => p.ProductImages)
                        .ThenInclude(pi => pi.Image)
                .ToListAsync();

            return Ok(favorites.ToViewModels());
        }

        [HttpPost]
        public async Task<ActionResult> Add([FromBody] ShortFavoriteProductDto model)
        {
            var exists = await _dataContext.FavoriteProducts
                .AnyAsync(f => f.UserId == model.UserId && f.ProductId == model.ProductId);

            if (exists)
            {
                return BadRequest("Product already in favorites.");
            }
            var favorite = new FavoriteProduct
            {
                UserId = model.UserId,
                ProductId = model.ProductId
            };

            _dataContext.FavoriteProducts.Add(favorite);
            await _dataContext.SaveChangesAsync();
            return Ok(favorite);
        }


        [HttpDelete("{userId}/{productId}")]
        public async Task<ActionResult> Remove(string userId, int productId)
        {
            var favorite = await _dataContext.FavoriteProducts
                .FirstOrDefaultAsync(f => f.UserId == userId && f.ProductId == productId);

            if (favorite == null)
                return NotFound();

            _dataContext.FavoriteProducts.Remove(favorite);
            await _dataContext.SaveChangesAsync();
            return Ok();
        }
    }
}
