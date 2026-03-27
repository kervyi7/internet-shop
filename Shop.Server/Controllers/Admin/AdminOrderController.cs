using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shop.Common.Enums;
using Shop.Database;
using Shop.Server.Common;
using Shop.Server.Models.DTO;
using System;
using System.Collections.Generic;
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
        public async Task<ActionResult<PageDataDto<IEnumerable<OrderDto>>>> GetAll(OrderFilterRequest request)
        {
            var query = _dataContext.Orders
                .Include(o => o.Items)
                    .ThenInclude(i => i.Product)
                        .ThenInclude(p => p.ProductImages)
                            .ThenInclude(pi => pi.Image)
                .Include(o => o.DeliveryAddress)
                .Include(o => o.ShippingOption)
                .AsQueryable();

            if (request.Status.HasValue)
            {
                switch (request.Status)
                {
                    case OrderStatus.Expired:
                        var cutoff = DateTime.UtcNow.AddHours(-24);
                        query = query.Where(o =>
                    (o.Status == OrderStatus.Pending || o.Status == OrderStatus.PaymentCancelled)
                    && o.CreatedAt < cutoff);
                        break;
                    default:
                        query = query.Where(o => o.Status == request.Status);
                        break;
                }
            }

            if (request.Skip < 0) request.Skip = 0;
            if (request.Count <= 0) request.Count = 20;
            var totalCount = await query.CountAsync();
            var orders = await query
                .OrderByDescending(o => o.CreatedAt)
                .Skip(request.Skip)
                .Take(request.Count)
                .ToListAsync();

            var response = new PageDataDto<IEnumerable<OrderDto>>
            {
                Data = orders.ToViewModels(),
                Count = totalCount
            };

            return Ok(response);
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
