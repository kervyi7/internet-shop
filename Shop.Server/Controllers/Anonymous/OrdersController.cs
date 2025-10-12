using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shop.Database;
using Shop.Database.Models;
using Shop.Server.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Shop.Server.Controllers.Anonymous
{
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly DataContext _dataContext;
        public OrdersController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<Order[]>> GetAll()
        {
            var userId = User.Identity.Name;
            var orders = await _dataContext.Orders
                .Include(o => o.Items)
                .ThenInclude(i => i.Product)
                .Include(o => o.DeliveryAddress)
                .Where(o => o.UserId == userId)
                .ToArrayAsync();
            return Ok(orders);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> Get(int id)
        {
            var userId = User.Identity.Name;
            var order = await _dataContext.Orders
                .Include(o => o.Items)
                .ThenInclude(i => i.Product)
                .Include(o => o.DeliveryAddress)
                .FirstOrDefaultAsync(o => o.Id == id && o.UserId == userId);

            if (order == null) return NotFound();
            return Ok(order);
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] OrderDto dto)
        {
            var order = new Order
            {
                UserId = dto.UserId,
                DeliveryAddressId = dto.DeliveryAddressId,
                CreatedAt = DateTime.UtcNow,
                Notes = dto.Notes
            };

            order.Items = new List<OrderItem>();
            foreach (var itemDto in dto.Items)
            {
                var product = await _dataContext.Products.FirstOrDefaultAsync(p => p.Id == itemDto.ProductId);
                if (product == null) return BadRequest($"Product {itemDto.ProductId} not found");

                order.Items.Add(new OrderItem
                {
                    ProductId = itemDto.ProductId,
                    Quantity = itemDto.Quantity,
                    PriceAtPurchase = product.SalePrice ?? product.Price
                });
            }

            order.TotalPrice = order.Items.Sum(i => i.PriceAtPurchase * i.Quantity);

            _dataContext.Orders.Add(order);
            await _dataContext.SaveChangesAsync();
            return Ok(order);
        }
    }
}
