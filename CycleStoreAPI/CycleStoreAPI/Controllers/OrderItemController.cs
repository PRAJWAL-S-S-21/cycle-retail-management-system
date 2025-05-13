using CycleStoreAPI.Data;
using CycleStoreAPI.DTOs;
using CycleStoreAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CycleStoreAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderItemController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public OrderItemController(ApplicationDbContext context)
        {
            _context = context;
        }

        // API to get total number of cycles purchased
        [HttpGet("total-cycles-purchased")]
        public async Task<ActionResult<int>> GetTotalCyclesPurchased()
        {
            // Sum the Quantity field across all OrderItems
            var totalCycles = await _context.OrderItems.SumAsync(oi => oi.Quantity);

            return Ok(totalCycles);
        }


    }
}

