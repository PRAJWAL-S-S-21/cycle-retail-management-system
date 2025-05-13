using CycleStoreAPI.DTOs;
using CycleStoreAPI.Models;
using System;
using Microsoft.AspNetCore.Mvc;
using CycleStoreAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace CycleStoreAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PaymentController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("revenue-by-payment-method")]
        public async Task<IActionResult> GetRevenueByPaymentMethod()
        {
            var result = await _context.Payment
                .Where(p => p.Status == PaymentStatus.SUCCESS) // or another status if applicable
                .GroupBy(p => p.PaymentType)
                .Select(g => new PaymentMethodRevenueDto
                {
                    PaymentType = g.Key.ToString(),
                    TotalRevenue = g.Sum(p => p.Amount)
                })
                .ToListAsync();

            return Ok(result);
        }

    }

}
