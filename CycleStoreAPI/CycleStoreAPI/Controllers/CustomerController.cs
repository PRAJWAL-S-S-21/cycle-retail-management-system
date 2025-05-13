using CycleStoreAPI.Data;
using CycleStoreAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CycleStoreAPI.DTOs;

namespace CycleStoreAPI.Controllers
{
    [Route("api/customer")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public CustomerController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetCustomers()
        {
            var customers = await _context.Customers
                .Select(c => new
                {
                    c.CustomerID,
                    c.FirstName,
                    c.LastName,
                    c.Email,
                    c.Phone,
                    BillingAddress = new
                    {
                        c.BillingAddress.StreetLine1,
                        c.BillingAddress.StreetLine2,
                        c.BillingAddress.City,
                        c.BillingAddress.State,
                        c.BillingAddress.PostalCode,
                        c.BillingAddress.Country
                    },
                    ShippingAddress = new
                    {
                        c.ShippingAddress.StreetLine1,
                        c.ShippingAddress.StreetLine2,
                        c.ShippingAddress.City,
                        c.ShippingAddress.State,
                        c.ShippingAddress.PostalCode,
                        c.ShippingAddress.Country
                    },
                    c.LoyaltyPoints,
                    c.CreatedAt,
                    c.UpdatedAt,
                    c.DeletedAt
                })
                .ToListAsync();

            return Ok(customers);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCustomerById(Guid id)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(c => c.CustomerID == id);

            if (customer == null)
            {
                return NotFound(new { message = "Customer not found" });
            }

            var result = new
            {
                customer.CustomerID,
                customer.FirstName,
                customer.LastName,
                customer.Email,
                customer.Phone,
                BillingAddress = new
                {
                    customer.BillingAddress.StreetLine1,
                    customer.BillingAddress.StreetLine2,
                    customer.BillingAddress.City,
                    customer.BillingAddress.State,
                    customer.BillingAddress.PostalCode,
                    customer.BillingAddress.Country
                },
                ShippingAddress = new
                {
                    customer.ShippingAddress.StreetLine1,
                    customer.ShippingAddress.StreetLine2,
                    customer.ShippingAddress.City,
                    customer.ShippingAddress.State,
                    customer.ShippingAddress.PostalCode,
                    customer.ShippingAddress.Country
                },
                customer.LoyaltyPoints,
                customer.CreatedAt,
                customer.UpdatedAt,
                customer.DeletedAt
            };

            return Ok(result);
        }


        [HttpPost]
        public async Task<IActionResult> CreateCustomer([FromBody] CreateCustomerDTO newCustomer)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var customer = new Customer
            {
                CustomerID = Guid.NewGuid(),
                FirstName = newCustomer.FirstName,
                LastName = newCustomer.LastName,
                Email = newCustomer.Email,
                Phone = newCustomer.Phone,
                LoyaltyPoints = newCustomer.LoyaltyPoints,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,

                BillingAddress = new Address
                {
                    StreetLine1 = newCustomer.BillingAddress.StreetLine1,
                    StreetLine2 = newCustomer.BillingAddress.StreetLine2,
                    City = newCustomer.BillingAddress.City,
                    State = newCustomer.BillingAddress.State,
                    PostalCode = newCustomer.BillingAddress.PostalCode,
                    Country = newCustomer.BillingAddress.Country,
                    //CreatedAt = DateTime.UtcNow
                },
                ShippingAddress = new Address
                {
                    StreetLine1 = newCustomer.ShippingAddress.StreetLine1,
                    StreetLine2 = newCustomer.ShippingAddress.StreetLine2,
                    City = newCustomer.ShippingAddress.City,
                    State = newCustomer.ShippingAddress.State,
                    PostalCode = newCustomer.ShippingAddress.PostalCode,
                    Country = newCustomer.ShippingAddress.Country,
                    //CreatedAt = DateTime.UtcNow
                }
            };

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            var result = new
            {
                message = "Customer created successfully",
                customer = new
                {
                    customer.CustomerID,
                    customer.FirstName,
                    customer.LastName,
                    customer.Email,
                    customer.Phone,
                    customer.LoyaltyPoints,
                    customer.CreatedAt,
                    customer.UpdatedAt,
                    BillingAddress = customer.BillingAddress,
                    ShippingAddress = customer.ShippingAddress
                }
            };

            return CreatedAtAction(nameof(GetCustomerById), new { id = customer.CustomerID }, result);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateCustomer(Guid id, [FromBody] UpdateCustomerDTO updatedCustomer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound(new { message = "Customer not found" });
            }

            bool hasUpdates =
                updatedCustomer.FirstName != null ||
                updatedCustomer.LastName != null ||
                updatedCustomer.Email != null ||
                updatedCustomer.Phone != null ||
                updatedCustomer.LoyaltyPoints.HasValue ||
                updatedCustomer.BillingAddress != null ||
                updatedCustomer.ShippingAddress != null;

            if (!hasUpdates)
            {
                return BadRequest(new { message = "No fields provided for update" });
            }

            // Basic fields
            if (!string.IsNullOrWhiteSpace(updatedCustomer.FirstName))
                customer.FirstName = updatedCustomer.FirstName;

            if (!string.IsNullOrWhiteSpace(updatedCustomer.LastName))
                customer.LastName = updatedCustomer.LastName;

            if (!string.IsNullOrWhiteSpace(updatedCustomer.Email))
                customer.Email = updatedCustomer.Email;

            if (!string.IsNullOrWhiteSpace(updatedCustomer.Phone))
                customer.Phone = updatedCustomer.Phone;

            if (updatedCustomer.LoyaltyPoints.HasValue)
                customer.LoyaltyPoints = updatedCustomer.LoyaltyPoints.Value;

            // Billing Address
            if (updatedCustomer.BillingAddress != null)
            {
                customer.BillingAddress.StreetLine1 = updatedCustomer.BillingAddress.StreetLine1 ?? customer.BillingAddress.StreetLine1;
                customer.BillingAddress.StreetLine2 = updatedCustomer.BillingAddress.StreetLine2 ?? customer.BillingAddress.StreetLine2;
                customer.BillingAddress.City = updatedCustomer.BillingAddress.City ?? customer.BillingAddress.City;
                customer.BillingAddress.State = updatedCustomer.BillingAddress.State ?? customer.BillingAddress.State;
                customer.BillingAddress.PostalCode = updatedCustomer.BillingAddress.PostalCode ?? customer.BillingAddress.PostalCode;
                customer.BillingAddress.Country = updatedCustomer.BillingAddress.Country ?? customer.BillingAddress.Country;
            }

            // Shipping Address
            if (updatedCustomer.ShippingAddress != null)
            {
                customer.ShippingAddress.StreetLine1 = updatedCustomer.ShippingAddress.StreetLine1 ?? customer.ShippingAddress.StreetLine1;
                customer.ShippingAddress.StreetLine2 = updatedCustomer.ShippingAddress.StreetLine2 ?? customer.ShippingAddress.StreetLine2;
                customer.ShippingAddress.City = updatedCustomer.ShippingAddress.City ?? customer.ShippingAddress.City;
                customer.ShippingAddress.State = updatedCustomer.ShippingAddress.State ?? customer.ShippingAddress.State;
                customer.ShippingAddress.PostalCode = updatedCustomer.ShippingAddress.PostalCode ?? customer.ShippingAddress.PostalCode;
                customer.ShippingAddress.Country = updatedCustomer.ShippingAddress.Country ?? customer.ShippingAddress.Country;
            }

            customer.UpdatedAt = DateTime.UtcNow;

            try
            {
                await _context.SaveChangesAsync();

                var result = new
                {
                    message = "Customer updated successfully",
                    customer = new
                    {
                        customer.CustomerID,
                        customer.FirstName,
                        customer.LastName,
                        customer.Email,
                        customer.Phone,
                        customer.LoyaltyPoints,
                        customer.CreatedAt,
                        customer.UpdatedAt,
                        BillingAddress = customer.BillingAddress,
                        ShippingAddress = customer.ShippingAddress
                    }
                };

                return Ok(result);

            }
            catch (DbUpdateConcurrencyException ex)
            {
                return StatusCode(500, new { message = "Error updating customer", details = ex.Message });
            }
        }


        // Delete customer
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCustomer(Guid id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound(new { message = "Customer not found" });
            }

            customer.DeletedAt = DateTime.UtcNow;
            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Customer deleted successfully" });
        }


        [HttpGet("phone/{phone}")]
        public async Task<IActionResult> GetCustomerByPhone(string phone)
        {
            var customer = await _context.Customers
                .AsNoTracking() // ✅ Important
                .Where(c => c.Phone == phone)
                .Select(c => new {
                    c.CustomerID,
                    c.FirstName,
                    c.LastName,
                    c.Email,
                    c.Phone,
                    c.LoyaltyPoints,
                    BillingAddress = new
                    {
                        c.BillingAddress.StreetLine1,
                        c.BillingAddress.StreetLine2,
                        c.BillingAddress.City,
                        c.BillingAddress.State,
                        c.BillingAddress.PostalCode,
                        c.BillingAddress.Country
                    },
                    ShippingAddress = new
                    {
                        c.ShippingAddress.StreetLine1,
                        c.ShippingAddress.StreetLine2,
                        c.ShippingAddress.City,
                        c.ShippingAddress.State,
                        c.ShippingAddress.PostalCode,
                        c.ShippingAddress.Country
                    }
                })
                .FirstOrDefaultAsync();

            if (customer == null)
            {
                return NotFound(new { message = "Customer not found" });
            }

            return Ok(customer);
        }

        [HttpGet("count")]
        public async Task<ActionResult<int>> GetCustomerCount()
        {
            var count = await _context.Customers.CountAsync();
            return Ok(count);
        }

    }
}
