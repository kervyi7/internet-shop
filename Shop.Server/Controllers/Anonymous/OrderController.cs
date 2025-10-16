using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shop.Database;
using Shop.Database.Models;
using Shop.Server.Common;
using Shop.Server.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Shop.Server.Controllers.Anonymous
{
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly DataContext _dataContext;
        public OrderController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<OrderDto[]>> GetAll(string userId)
        {
            var orders = await _dataContext.Orders
                .Include(o => o.Items)
                    .ThenInclude(i => i.Product)
                        .ThenInclude(p => p.Category)
                .Include(o => o.Items)
                .ThenInclude(i => i.Product)
                        .ThenInclude(p => p.ProductImages)
                            .ThenInclude(pi => pi.Image)
                .Include(o => o.DeliveryAddress)
                .Include(o => o.ShippingOption)
                .Where(o => o.UserId == userId)
                .ToArrayAsync();

            return Ok(orders.ToViewModels());
        }

        [HttpGet("{userId}/{id}")]
        public async Task<ActionResult<OrderDto>> Get(string userId, int id)
        {
            var order = await _dataContext.Orders
                .Include(o => o.Items)
                    .ThenInclude(i => i.Product)
                        .ThenInclude(p => p.Category)
                .Include(o => o.Items)
                    .ThenInclude(i => i.Product)
                        .ThenInclude(p => p.ProductImages)
                            .ThenInclude(pi => pi.Image)
                .Include(o => o.DeliveryAddress)
                .Include(o => o.ShippingOption)
                .FirstOrDefaultAsync(o => o.Id == id && o.UserId == userId);

            if (order == null)
                return NotFound();

            return Ok(order.ToViewModel());
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] OrderDto dto)
        {
            if (dto == null)
                return BadRequest("Order data is required.");

            if (dto.ShippingOptionId <= 0)
                return BadRequest("Shipping option is required.");

            var shippingOption = await _dataContext.ShippingOptions
                .FirstOrDefaultAsync(x => x.Id == dto.ShippingOptionId && x.IsActive);

            if (shippingOption == null)
                return BadRequest("Invalid or inactive shipping option.");

            var order = new Order
            {
                UserId = dto.UserId,
                CreatedAt = DateTime.UtcNow,
                Notes = dto.Notes,
                Currency = "USD",
                ShippingOptionId = dto.ShippingOptionId,
                Items = new List<OrderItem>()
            };

            DeliveryAddress deliveryAddress = null;

            if (dto.DeliveryAddressId.HasValue)
            {
                deliveryAddress = await _dataContext.DeliveryAddresses
                    .FirstOrDefaultAsync(a => a.Id == dto.DeliveryAddressId);

                if (deliveryAddress == null)
                    return BadRequest("Invalid delivery address ID.");
            }
            else if (dto.DeliveryAddress != null)
            {
                deliveryAddress = new DeliveryAddress
                {
                    UserId = dto.UserId,
                    FirstName = dto.DeliveryAddress.FirstName,
                    LastName = dto.DeliveryAddress.LastName,
                    Country = dto.DeliveryAddress.Country,
                    City = dto.DeliveryAddress.City,
                    Street = dto.DeliveryAddress.Street,
                    HouseNumber = dto.DeliveryAddress.HouseNumber,
                    Apartment = dto.DeliveryAddress.Apartment,
                    Postcode = dto.DeliveryAddress.Postcode,
                    Phone = dto.DeliveryAddress.Phone,
                    Email = dto.DeliveryAddress.Email,
                    Notes = dto.DeliveryAddress.Notes
                };

                _dataContext.DeliveryAddresses.Add(deliveryAddress);
                await _dataContext.SaveChangesAsync();
            }
            else
            {
                return BadRequest("Delivery address is required.");
            }

            order.DeliveryAddressId = deliveryAddress.Id;

            foreach (var itemDto in dto.Items)
            {
                var product = await _dataContext.Products
                    .FirstOrDefaultAsync(p => p.Id == itemDto.ProductId);

                if (product == null)
                    return BadRequest($"Product {itemDto.ProductId} not found.");

                order.Items.Add(new OrderItem
                {
                    ProductId = itemDto.ProductId,
                    Quantity = itemDto.Quantity,
                    PriceAtPurchase = product.DiscountedPrice ?? product.Price
                });
            }

            order.TotalPrice = order.Items.Sum(i => i.PriceAtPurchase * i.Quantity) + shippingOption.Cost;

            _dataContext.Orders.Add(order);
            await _dataContext.SaveChangesAsync();

            return Ok(order.Id);
        }

    }
}
