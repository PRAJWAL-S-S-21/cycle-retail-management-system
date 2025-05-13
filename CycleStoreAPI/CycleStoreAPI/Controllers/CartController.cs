using CycleStoreAPI.Data;
using CycleStoreAPI.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CycleStoreAPI.Controllers
{
    [ApiController]
    [Route("api/cart")]
    public class CartController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CartController(ApplicationDbContext context)
        {
            _context = context;
        }

        //[HttpPost("add")]
        //public async Task<IActionResult> AddToCart([FromBody] CreateCartItemDTO cartItemDetails)
        //{
        //    var cycle = await _context.Cycles.FindAsync(cartItemDetails.CycleID);
        //    if (cycle == null) return NotFound(new { message = "Cycle not found" });

        //    var customer = await _context.Customers.FindAsync(cartItemDetails.CustomerID);
        //    if (customer == null) return NotFound(new { message = "Customer is not found" });

        //    var existingItem = await _context.CartItems.FirstOrDefaultAsync( c => c.CustomerID == cartItemDetails.CustomerID && c.CycleID == cartItemDetails.CycleID );

        //    if (existingItem != null)
        //    {
        //        existingItem.Quantity += cartItemDetails.Quantity;
        //        _context.CartItems.Update(existingItem);
        //    }

        //    else
        //    {
        //        var cartItem = new CartItem
        //        {
        //            CustomerID 
        //        };
        //    }
        //}
    } 
}
