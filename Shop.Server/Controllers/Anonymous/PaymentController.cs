using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Shop.Common.Enums;
using Shop.Database;
using Shop.Server.Common;
using Shop.Server.Models;
using Stripe;
using Stripe.Checkout;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class PaymentController : ControllerBase
{
    private readonly DataContext _dataContext;
    private readonly AppSettings _appSettings;

    public PaymentController(DataContext context, IOptions<AppSettings> appSettings, IConfiguration configuration)
    {
        _dataContext = context;
        _appSettings = new AppSettings(configuration);
    }

    [HttpPost("create-checkout-session")]
    public async Task<IActionResult> CreateCheckoutSession([FromBody] CreateCheckoutSessionRequest request)
    {
        StripeConfiguration.ApiKey = _appSettings.PaymentConfig.SecretKeyStripe;

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
                .FirstOrDefaultAsync(o => o.Id == request.OrderId);

        if (order == null)
            return NotFound();

        var options = new SessionCreateOptions
        {
            PaymentMethodTypes = new List<string> { "card" },
            LineItems = new List<SessionLineItemOptions>
            {
                new SessionLineItemOptions
                {
                    PriceData = new SessionLineItemPriceDataOptions
                    {
                        UnitAmount = (long)(order.TotalPrice * 100),
                        Currency = "usd",
                        ProductData = new SessionLineItemPriceDataProductDataOptions
                        {
                            Name = "Order #" + order.Id
                        },
                    },
                    Quantity = 1,
                },
            },
            Mode = "payment",
            SuccessUrl = $"{_appSettings.PaymentConfig.SuccessUrl}/{request.OrderId}",
            CancelUrl = $"{_appSettings.PaymentConfig.CancelUrl}/{request.OrderId}"
        };

        var service = new SessionService();
        var session = await service.CreateAsync(options);

        return Ok(new { id = session.Id });
    }

    [HttpGet("success/{orderId}")]
    public async Task<IActionResult> PaymentSuccess(int orderId)
    {
        var order = await _dataContext.Orders.FirstOrDefaultAsync(o => o.Id == orderId);
        if (order == null)
            return NotFound("Order not found");

        order.Status = OrderStatus.Paid;
        order.PaidAt = DateTime.UtcNow;
        order.UpdatedAt = DateTime.UtcNow;
        await _dataContext.SaveChangesAsync();
        return Redirect($"{_appSettings.PaymentConfig.FrontendSuccessPage}/{order.Id}");
    }

    [HttpGet("cancel/{orderId}")]
    public async Task<IActionResult> PaymentCancelled(int orderId)
    {
        var order = await _dataContext.Orders.FirstOrDefaultAsync(o => o.Id == orderId);
        if (order == null)
            return NotFound("Order not found");

        order.Status = OrderStatus.PaymentCancelled;
        order.UpdatedAt = DateTime.UtcNow;
        await _dataContext.SaveChangesAsync();
        return Redirect($"{_appSettings.PaymentConfig.FrontendCancelPage}/{order.Id}");
    }
}
