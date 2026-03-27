using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Shop.Common.Enums;
using Shop.Database;
using Shop.Database.Models;
using Shop.Server.Common;
using Shop.Server.Models;
using Stripe;
using Stripe.Checkout;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class PaymentController : ControllerBase
{
    private readonly DataContext _dataContext;
    private readonly AppSettings _appSettings;

    public PaymentController(DataContext context, IConfiguration configuration)
    {
        _dataContext = context;
        _appSettings = new AppSettings(configuration);
    }

    [HttpPost("create-checkout-session")]
    public async Task<IActionResult> CreateCheckoutSession([FromBody] CreateCheckoutSessionRequest request)
    {
        StripeConfiguration.ApiKey = _appSettings.PaymentConfig.SecretKeyStripe;

        var order = await _dataContext.Orders
            .Include(x => x.Items)
            .FirstOrDefaultAsync(o => o.Id == request.OrderId);

        if (order == null)
            return NotFound("Order not found");

        var paymentSession = new PaymentSession
        {
            OrderId = order.Id
        };

        _dataContext.PaymentSessions.Add(paymentSession);
        await _dataContext.SaveChangesAsync();

        var options = new SessionCreateOptions
        {
            Mode = "payment",
            PaymentMethodTypes = new List<string> { "card" },
            LineItems = new List<SessionLineItemOptions>
            {
                new SessionLineItemOptions
                {
                    Quantity = 1,
                    PriceData = new SessionLineItemPriceDataOptions
                    {
                        Currency = "usd",
                        UnitAmount = (long)(order.TotalPrice * 100),
                        ProductData = new SessionLineItemPriceDataProductDataOptions
                        {
                            Name = $"Order #{order.Id}"
                        }
                    }
                }
            },
            SuccessUrl = $"{_appSettings.PaymentConfig.SuccessUrl}/{paymentSession.Id}",
            CancelUrl = $"{_appSettings.PaymentConfig.CancelUrl}/{paymentSession.Id}"
        };

        var sessionService = new SessionService();
        var stripeSession = await sessionService.CreateAsync(options);

        paymentSession.StripeSessionId = stripeSession.Id;
        await _dataContext.SaveChangesAsync();

        return Ok(new { id = stripeSession.Id });
    }

    [HttpGet("success/{guid}")]
    public async Task<IActionResult> PaymentSuccess(Guid guid)
    {
        var session = await _dataContext.PaymentSessions
            .FirstOrDefaultAsync(x => x.Id == guid);

        if (session == null)
            return NotFound("Invalid payment session");

        return Redirect($"{_appSettings.PaymentConfig.FrontendSuccessPage}/{session.OrderId}");
    }

    [HttpGet("cancel/{guid}")]
    public async Task<IActionResult> PaymentCancel(Guid guid)
    {
        var session = await _dataContext.PaymentSessions
            .Include(x => x.Order)
            .FirstOrDefaultAsync(x => x.Id == guid);

        if (session == null)
            return NotFound("Invalid payment session");

        return Redirect($"{_appSettings.PaymentConfig.FrontendCancelPage}/{session.OrderId}");
    }

    [HttpPost("stripe-webhook")]
    public async Task<IActionResult> StripeWebhook()
    {
        var json = await new StreamReader(Request.Body).ReadToEndAsync();
        var webhookSecret = _appSettings.PaymentConfig.WebhookSecret;

        Event stripeEvent;

        try
        {
            stripeEvent = EventUtility.ConstructEvent(
                json,
                Request.Headers["Stripe-Signature"],
                webhookSecret
            );
        }
        catch
        {
            return BadRequest();
        }

        if (stripeEvent.Type == "checkout.session.completed")
        {
            var session = stripeEvent.Data.Object as Session;

            var paymentSession = await _dataContext.PaymentSessions
                .Include(x => x.Order)
                .FirstOrDefaultAsync(x => x.StripeSessionId == session.Id);

            if (paymentSession != null && paymentSession.Order.Status != OrderStatus.Paid)
            {
                paymentSession.Order.Status = OrderStatus.Paid;
                paymentSession.Order.PaidAt = DateTime.UtcNow;
                await _dataContext.SaveChangesAsync();
            }
        }

        return Ok();
    }
}
