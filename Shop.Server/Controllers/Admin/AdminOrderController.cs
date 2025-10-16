using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shop.Common.Enums;
using Shop.Database;
using Shop.Server.Common;
using Shop.Server.Models.DTO;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Shop.Server.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminOrderController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public AdminOrderController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpPost("list")]
        public async Task<ActionResult<OrderDto[]>> GetAll(
            [FromQuery] OrderStatus? status,
            [FromBody] PaginationDto pagination)
        {
            var query = _dataContext.Orders
                .Include(o => o.Items)
                    .ThenInclude(i => i.Product)
                        .ThenInclude(p => p.ProductImages)
                            .ThenInclude(pi => pi.Image)
                .Include(o => o.DeliveryAddress)
                .Include(o => o.ShippingOption)
                .AsQueryable();

            if (status.HasValue)
                query = query.Where(o => o.Status == status.Value);

            if (!string.IsNullOrWhiteSpace(pagination.SearchValue))
            {
                var term = pagination.SearchValue.ToLower();
                query = query.Where(o =>
                    o.Id.ToString().Contains(term) ||
                    (o.User != null && o.User.Email.ToLower().Contains(term)) ||
                    (o.DeliveryAddress != null &&
                        (o.DeliveryAddress.City.ToLower().Contains(term) ||
                         o.DeliveryAddress.Street.ToLower().Contains(term))));
            }

            if (pagination.Skip < 0) pagination.Skip = 0;
            if (pagination.Count <= 0) pagination.Count = 20;

            var orders = await query
                .OrderByDescending(o => o.CreatedAt)
                .Skip(pagination.Skip)
                .Take(pagination.Count)
                .ToListAsync();

            return Ok(orders.ToViewModels());
        }

        [HttpGet("expired")]
        public async Task<ActionResult<OrderDto[]>> GetExpired()
        {
            var cutoff = DateTime.UtcNow.AddHours(-24);

            var orders = await _dataContext.Orders
                .Include(o => o.Items)
                    .ThenInclude(i => i.Product)
                        .ThenInclude(p => p.ProductImages)
                            .ThenInclude(pi => pi.Image)
                .Include(o => o.DeliveryAddress)
                .Include(o => o.ShippingOption)
                .Where(o =>
                    (o.Status == OrderStatus.Pending || o.Status == OrderStatus.PaymentCancelled)
                    && o.CreatedAt < cutoff)
                .OrderBy(o => o.CreatedAt)
                .ToListAsync();

            return Ok(orders.ToViewModels());
        }

        [HttpPut("{orderId}/status")]
        public async Task<ActionResult> UpdateStatus(int orderId, [FromBody] UpdateOrderStatusDto dto)
        {
            var order = await _dataContext.Orders.FirstOrDefaultAsync(o => o.Id == orderId);
            if (order == null)
                return NotFound("Order not found.");

            if (!Enum.IsDefined(typeof(OrderStatus), dto.Status))
                return BadRequest("Invalid order status.");

            order.Status = dto.Status;
            order.UpdatedAt = DateTime.UtcNow;

            if (dto.Status == OrderStatus.Paid)
                order.PaidAt = DateTime.UtcNow;
            else if (dto.Status == OrderStatus.Shipped)
                order.ShippedAt = DateTime.UtcNow;

            _dataContext.Orders.Update(order);
            await _dataContext.SaveChangesAsync();

            return Ok();
        }
    }
}
