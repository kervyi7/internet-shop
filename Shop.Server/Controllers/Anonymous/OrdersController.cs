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
                ShippingOptionId = dto.ShippingOptionId
            };

            if (!string.IsNullOrEmpty(dto.UserId) && dto.DeliveryAddress == null)
            {
                if (!dto.DeliveryAddressId.HasValue)
                    return BadRequest("DeliveryAddressId is required for registered user.");

                var addressExists = await _dataContext.DeliveryAddresses
                    .AnyAsync(a => a.Id == dto.DeliveryAddressId && a.UserId == dto.UserId);

                if (!addressExists)
                    return BadRequest("Invalid delivery address.");

                order.DeliveryAddressId = dto.DeliveryAddressId;
            }
            else
            {
                if (dto.DeliveryAddress == null)
                    return BadRequest("Delivery address is required for guest order.");

                order.TempFirstName = dto.DeliveryAddress.FirstName;
                order.TempLastName = dto.DeliveryAddress.LastName;
                order.TempCountry = dto.DeliveryAddress.Country;
                order.TempCity = dto.DeliveryAddress.City;
                order.TempStreet = dto.DeliveryAddress.Street;
                order.TempHouseNumber = dto.DeliveryAddress.HouseNumber;
                order.TempApartment = dto.DeliveryAddress.Apartment;
                order.TempPostcode = dto.DeliveryAddress.Postcode;
                order.TempPhone = dto.DeliveryAddress.Phone;
                order.TempEmail = dto.DeliveryAddress.Email;
                order.TempNotes = dto.DeliveryAddress.Notes;
            }

            order.Items = new List<OrderItem>();
            foreach (var itemDto in dto.Items)
            {
                var product = await _dataContext.Products.FirstOrDefaultAsync(p => p.Id == itemDto.ProductId);
                if (product == null)
                    return BadRequest($"Product {itemDto.ProductId} not found");

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
