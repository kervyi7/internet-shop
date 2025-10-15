using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shop.Database;
using Shop.Database.Models;
using Shop.Server.Common;
using Shop.Server.Models.DTO;
using System.Linq;
using System.Threading.Tasks;

namespace Shop.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly DataContext _dataContext;
        public CartController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<CartItemDto[]>> GetAll(string userId)
        {
            var items = await _dataContext.CartItems
                .Include(c => c.Product)
                .ThenInclude(p => p.ProductImages)
                .Where(c => c.UserId == userId)
                .Select(c => new CartItemDto
                {
                    UserId = c.UserId,
                    ProductId = c.ProductId,
                    Quantity = c.Quantity,
                    Product = c.Product.ToViewModel()
                })
                .ToArrayAsync();

            return Ok(items);
        }

        [HttpPost]
        public async Task<ActionResult> Add([FromBody] ShortCartItemDto model)
        {
            var existing = await _dataContext.CartItems
                .FirstOrDefaultAsync(c => c.UserId == model.UserId && c.ProductId == model.ProductId);

            if (existing != null)
            {
                existing.Quantity += model.Quantity;
            }
            else
            {
                var item = new CartItem
                {
                    UserId = model.UserId,
                    ProductId = model.ProductId,
                    Quantity = model.Quantity,
                    IsSelected = true
                };
                _dataContext.CartItems.Add(item);
            }

            await _dataContext.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{userId}/{productId}")]
        public async Task<ActionResult> Remove(string userId, int productId)
        {
            var item = await _dataContext.CartItems
                .FirstOrDefaultAsync(c => c.UserId == userId && c.ProductId == productId);

            if (item == null)
                return NotFound();

            _dataContext.CartItems.Remove(item);
            await _dataContext.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("delete-selected")]
        public async Task<ActionResult> DeleteSelected([FromBody] DeleteSelectedDto dto)
        {
            if (string.IsNullOrEmpty(dto.UserId) || dto.ProductIds == null || !dto.ProductIds.Any())
                return BadRequest("Invalid data");

            var itemsToRemove = await _dataContext.CartItems
                .Where(c => c.UserId == dto.UserId && dto.ProductIds.Contains(c.ProductId))
                .ToListAsync();

            if (!itemsToRemove.Any())
                return NotFound("No matching items found in cart");

            _dataContext.CartItems.RemoveRange(itemsToRemove);
            await _dataContext.SaveChangesAsync();

            return Ok(new { removed = itemsToRemove.Count });
        }


        [HttpPost("{userId}/select-all/{isSelected}")]
        public async Task<ActionResult> SelectAll(string userId, bool isSelected)
        {
            var items = await _dataContext.CartItems
                .Where(c => c.UserId == userId)
                .ToListAsync();

            foreach (var item in items)
                item.IsSelected = isSelected;

            await _dataContext.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{userId}/clear")]
        public async Task<ActionResult> Clear(string userId)
        {
            var items = await _dataContext.CartItems
                .Where(c => c.UserId == userId)
                .ToListAsync();

            _dataContext.CartItems.RemoveRange(items);
            await _dataContext.SaveChangesAsync();
            return Ok();
        }
    }
}
