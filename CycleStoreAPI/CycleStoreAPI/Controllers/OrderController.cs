using CycleStoreAPI.Data;
using CycleStoreAPI.DTOs;
using CycleStoreAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CycleStoreAPI.Controllers
{
    [Route("api/order")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public OrderController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] OrderCreateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                // Validate Customer and Employee
                if (!await _context.Customers.AnyAsync(c => c.CustomerID == dto.CustomerId))
                    return BadRequest("Invalid CustomerId.");

                if (!await _context.Users.AnyAsync(u => u.UserID == dto.EmployeeId))
                    return BadRequest("Invalid EmployeeId.");

                // Create Order
                var order = new Order
                {
                    OrderNumber = $"ORD-{Guid.NewGuid().ToString().Substring(0, 8)}",
                    CustomerId = dto.CustomerId,
                    EmployeeId = dto.EmployeeId,
                    OrderDate = DateTime.UtcNow,
                    Status = OrderStatus.COMPLETED,
                    Subtotal = dto.Subtotal,
                    Tax = dto.Tax,
                    Discount = dto.Discount,
                    TotalAmount = dto.TotalAmount,
                    Notes = dto.Notes,
                    ShippingAddress = new Address
                    {
                        StreetLine1 = dto.ShippingAddress.StreetLine1,
                        StreetLine2 = dto.ShippingAddress.StreetLine2,
                        City = dto.ShippingAddress.City,
                        State = dto.ShippingAddress.State,
                        PostalCode = dto.ShippingAddress.PostalCode,
                        Country = dto.ShippingAddress.Country
                    },
                    OrderItems = dto.OrderItems.Select(i => new OrderItem
                    {
                        CycleId = i.CycleId,
                        Quantity = i.Quantity,
                        UnitPrice = i.UnitPrice,
                        TaxRate = i.TaxRate,
                        TotalPrice = i.TotalPrice
                    }).ToList()
                };

                // Validate CycleIds
                foreach (var item in order.OrderItems)
                {
                    if (!await _context.Cycles.AnyAsync(c => c.CycleID == item.CycleId))
                        return BadRequest($"Invalid CycleId: {item.CycleId}.");
                }

                // Create Payment
                var payment = new Payment
                {
                    OrderId = order.OrderId,
                    PaymentType = dto.Payment.PaymentType,
                    Amount = dto.Payment.Amount,
                    Status = dto.Payment.Status,
                    ConfirmedByEmployee = dto.Payment.ConfirmedByEmployee,
                    CreatedAt = DateTime.UtcNow
                };

                // Payment Method Logic
                switch (dto.Payment.PaymentType)
                {
                    case PaymentType.CASH:
                        if (!dto.Payment.ConfirmedByEmployee)
                            return BadRequest("Cash payment must be confirmed by employee.");
                        if (dto.Payment.Status != PaymentStatus.SUCCESS)
                            return BadRequest("Cash payment status must be Success.");
                        break;

                    case PaymentType.UPI:
                        if (string.IsNullOrEmpty(dto.Payment.UpiTransactionId))
                            return BadRequest("UPI payment requires a transaction ID.");
                        if (!dto.Payment.ConfirmedByEmployee)
                            return BadRequest("UPI payment must be confirmed by employee.");
                        if (dto.Payment.Status != PaymentStatus.SUCCESS)
                            return BadRequest("UPI payment status must be Success.");
                        payment.UpiTransactionId = dto.Payment.UpiTransactionId;
                        break;

                    case PaymentType.CARD:
                        if (string.IsNullOrEmpty(dto.Payment.StripePaymentId) || string.IsNullOrEmpty(dto.Payment.CardLast4))
                            return BadRequest("Card payment requires StripePaymentId and CardLast4.");
                        if (dto.Payment.Status != PaymentStatus.SUCCESS)
                            return BadRequest("Card payment status must be Success.");
                        payment.StripePaymentId = dto.Payment.StripePaymentId;
                        payment.CardLast4 = dto.Payment.CardLast4;
                        break;

                    default:
                        return BadRequest("Invalid payment type.");
                }

                // Validate Payment Amount
                if (payment.Amount != order.TotalAmount)
                    return BadRequest("Payment amount must match order total.");

                order.Payment = payment;

                // Save to Database
                _context.Orders.Add(order);
                await _context.SaveChangesAsync();

                var orderWithDetails = await _context.Orders
                    .Include(o => o.Customer)
                    .Include(o => o.OrderItems)
                        .ThenInclude(i => i.Cycle)
                    .Include(o => o.Payment)
                    .FirstOrDefaultAsync(o => o.OrderId == order.OrderId);

                if (orderWithDetails == null)
                    return NotFound("Order not found after creation");

                // Response DTO
                //var response = new
                //{
                //    order.OrderId,
                //    order.OrderNumber,
                //    order.CustomerId,
                //    order.EmployeeId,
                //    order.OrderDate,
                //    order.Status,
                //    order.Subtotal,
                //    order.Tax,
                //    order.Discount,
                //    order.TotalAmount,
                //    order.Notes,
                //    order.CreatedAt,
                //    order.UpdatedAt,
                //    ShippingAddress = new
                //    {
                //        order.ShippingAddress.StreetLine1,
                //        order.ShippingAddress.StreetLine2,
                //        order.ShippingAddress.City,
                //        order.ShippingAddress.State,
                //        order.ShippingAddress.PostalCode,
                //        order.ShippingAddress.Country
                //    },
                //    OrderItems = order.OrderItems.Select(i => new
                //    {
                //        i.OrderItemId,
                //        i.OrderId,
                //        i.CycleId,
                //        i.Quantity,
                //        i.UnitPrice,
                //        i.TaxRate,
                //        i.TotalPrice
                //    }),
                //    Payment = new
                //    {
                //        payment.PaymentId,
                //        payment.OrderId,
                //        payment.PaymentType,
                //        payment.StripePaymentId,
                //        payment.UpiTransactionId,
                //        payment.CardLast4,
                //        payment.Amount,
                //        payment.Status,
                //        payment.ConfirmedByEmployee,
                //        payment.CreatedAt,
                //        payment.UpdatedAt
                //    }
                //};

                var response = new
                {
                    orderWithDetails.OrderId,
                    orderWithDetails.OrderNumber,
                    orderWithDetails.CustomerId,
                    Customer = new
                    {
                        orderWithDetails.Customer.CustomerID,
                        orderWithDetails.Customer.FirstName,
                        orderWithDetails.Customer.LastName,
                        orderWithDetails.Customer.Email,
                        orderWithDetails.Customer.Phone
                    },
                    orderWithDetails.EmployeeId,
                    orderWithDetails.OrderDate,
                    orderWithDetails.Status,
                    orderWithDetails.Subtotal,
                    orderWithDetails.Tax,
                    orderWithDetails.Discount,
                    orderWithDetails.TotalAmount,
                    orderWithDetails.Notes,
                    orderWithDetails.CreatedAt,
                    orderWithDetails.UpdatedAt,
                    ShippingAddress = new
                    {
                        orderWithDetails.ShippingAddress.StreetLine1,
                        orderWithDetails.ShippingAddress.StreetLine2,
                        orderWithDetails.ShippingAddress.City,
                        orderWithDetails.ShippingAddress.State,
                        orderWithDetails.ShippingAddress.PostalCode,
                        orderWithDetails.ShippingAddress.Country
                    },
                    OrderItems = orderWithDetails.OrderItems.Select(i => new
                    {
                        i.OrderItemId,
                        i.OrderId,
                        i.CycleId,
                        Cycle = new
                        {
                            i.Cycle.CycleID,
                            i.Cycle.ModelName,
                            i.Cycle.Price
                        },
                        i.Quantity,
                        i.UnitPrice,
                        i.TaxRate,
                        i.TotalPrice
                    }),
                    Payment = new
                    {
                        orderWithDetails.Payment.PaymentId,
                        orderWithDetails.Payment.OrderId,
                        orderWithDetails.Payment.PaymentType,
                        orderWithDetails.Payment.StripePaymentId,
                        orderWithDetails.Payment.UpiTransactionId,
                        orderWithDetails.Payment.CardLast4,
                        orderWithDetails.Payment.Amount,
                        orderWithDetails.Payment.Status,
                        orderWithDetails.Payment.ConfirmedByEmployee,
                        orderWithDetails.Payment.CreatedAt,
                        orderWithDetails.Payment.UpdatedAt
                    }
                };

                return CreatedAtAction(nameof(GetOrderById), new { id = order.OrderId }, response);
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, $"Database error: {ex.InnerException?.Message ?? ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Unexpected error: {ex.Message}");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = await _context.Orders
                .Include(o => o.OrderItems)
                    .ThenInclude(i => i.Cycle)
                .Include(o => o.Payment)
                .Include(o => o.Customer)
                .Select(o => new
                {
                    o.OrderId,
                    o.OrderNumber,
                    o.CustomerId,
                    Customer = new
                    {
                        o.Customer.CustomerID,
                        o.Customer.FirstName,
                        o.Customer.LastName,
                        o.Customer.Email,
                        o.Customer.Phone

                    },
                    o.EmployeeId,
                    o.OrderDate,
                    o.Status,
                    o.Subtotal,
                    o.Tax,
                    o.Discount,
                    o.TotalAmount,
                    o.Notes,
                    o.CreatedAt,
                    o.UpdatedAt,
                    ShippingAddress = new
                    {
                        o.ShippingAddress.StreetLine1,
                        o.ShippingAddress.StreetLine2,
                        o.ShippingAddress.City,
                        o.ShippingAddress.State,
                        o.ShippingAddress.PostalCode,
                        o.ShippingAddress.Country
                    },
                    OrderItems = o.OrderItems.Select(i => new
                    {
                        i.OrderItemId,
                        i.OrderId,
                        i.CycleId,
                        Cycle = new
                        {
                            i.Cycle.CycleID,
                            i.Cycle.ModelName,
                            i.Cycle.Price

                        },
                        i.Quantity,
                        i.UnitPrice,
                        i.TaxRate,
                        i.TotalPrice
                    }),
                    Payment = new
                    {
                        o.Payment.PaymentId,
                        o.Payment.OrderId,
                        o.Payment.PaymentType,
                        o.Payment.StripePaymentId,
                        o.Payment.UpiTransactionId,
                        o.Payment.CardLast4,
                        o.Payment.Amount,
                        o.Payment.Status,
                        o.Payment.ConfirmedByEmployee,
                        o.Payment.CreatedAt,
                        o.Payment.UpdatedAt
                    }
                })
                .ToListAsync();

            return Ok(orders);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderById(Guid id)
        {
            var order = await _context.Orders
                .Include(o => o.OrderItems)
                .Include(o => o.Payment)
                .FirstOrDefaultAsync(o => o.OrderId == id);

            if (order == null)
                return NotFound();

            var response = new
            {
                order.OrderId,
                order.OrderNumber,
                order.CustomerId,
                order.EmployeeId,
                order.OrderDate,
                order.Status,
                order.Subtotal,
                order.Tax,
                order.Discount,
                order.TotalAmount,
                order.Notes,
                order.CreatedAt,
                order.UpdatedAt,
                ShippingAddress = new
                {
                    order.ShippingAddress.StreetLine1,
                    order.ShippingAddress.StreetLine2,
                    order.ShippingAddress.City,
                    order.ShippingAddress.State,
                    order.ShippingAddress.PostalCode,
                    order.ShippingAddress.Country
                },
                OrderItems = order.OrderItems.Select(i => new
                {
                    i.OrderItemId,
                    i.OrderId,
                    i.CycleId,
                    i.Quantity,
                    i.UnitPrice,
                    i.TaxRate,
                    i.TotalPrice
                }),
                Payment = new
                {
                    order.Payment.PaymentId,
                    order.Payment.OrderId,
                    order.Payment.PaymentType,
                    order.Payment.StripePaymentId,
                    order.Payment.UpiTransactionId,
                    order.Payment.CardLast4,
                    order.Payment.Amount,
                    order.Payment.Status,
                    order.Payment.ConfirmedByEmployee,
                    order.Payment.CreatedAt,
                    order.Payment.UpdatedAt
                }
            };

            return Ok(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrderStatus(Guid id, [FromBody] OrderStatus status)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
                return NotFound();

            order.Status = status;
            order.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            var response = new
            {
                order.OrderId,
                order.OrderNumber,
                order.CustomerId,
                order.EmployeeId,
                order.OrderDate,
                order.Status,
                order.Subtotal,
                order.Tax,
                order.Discount,
                order.TotalAmount,
                order.Notes,
                order.CreatedAt,
                order.UpdatedAt,
                ShippingAddress = new
                {
                    order.ShippingAddress.StreetLine1,
                    order.ShippingAddress.StreetLine2,
                    order.ShippingAddress.City,
                    order.ShippingAddress.State,
                    order.ShippingAddress.PostalCode,
                    order.ShippingAddress.Country
                }
            };

            return Ok(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(Guid id)
        {
            var order = await _context.Orders
                .Include(o => o.OrderItems)
                .Include(o => o.Payment)
                .FirstOrDefaultAsync(o => o.OrderId == id);

            if (order == null)
                return NotFound();

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();

        }

        [HttpGet("totalsales")]
        public async Task<ActionResult<decimal>> GetTotalSales()
        {
            var totalSales = await _context.Orders.SumAsync(o => o.TotalAmount); // Sum the TotalAmount

            return Ok(totalSales);
        }

        [HttpGet("totalorders")]
        public async Task<ActionResult<int>> GetTotalOrders()
        {
            var totalOrders = await _context.Orders.CountAsync();

            return Ok(totalOrders);
        }

        // API: Get Revenue for Today
        [HttpGet("revenue-today")]
        public async Task<IActionResult> GetRevenueToday()
        {
            var today = DateTime.UtcNow.Date; // today 00:00 time

            var revenueToday = await _context.Orders
                .Where(o => o.OrderDate.Date == today)
                .SumAsync(o => (decimal?)o.TotalAmount) ?? 0;

            return Ok(revenueToday);
        }

        [HttpGet("revenue-this-month")]
        public async Task<IActionResult> GetRevenueThisMonth()
        {
            var utcNow = DateTime.UtcNow;
            var firstDayOfMonth = new DateTime(utcNow.Year, utcNow.Month, 1, 0, 0, 0, DateTimeKind.Utc);

            var revenueThisMonth = await _context.Orders
                .Where(o => o.OrderDate >= firstDayOfMonth && o.OrderDate <= utcNow)
                .SumAsync(o => (decimal?)o.TotalAmount) ?? 0;

            return Ok(revenueThisMonth);
        }

        [HttpGet("sales-over-time")]
        public async Task<IActionResult> GetSalesOverTime()
        {
            var salesData = await _context.Orders
                .GroupBy(o => o.OrderDate.Date) // Group by Date only (without time)
                .Select(g => new
                {
                    Date = g.Key,
                    Revenue = g.Sum(o => o.TotalAmount)
                })
                .OrderBy(x => x.Date) // Sort by date ascending
                .ToListAsync();

            return Ok(salesData);
        }

        [HttpGet("status-counts")]
        public async Task<IActionResult> GetOrderStatusCounts()
        {
            var statusCounts = await _context.Orders
                .GroupBy(o => o.Status)
                .Select(g => new
                {
                    Status = g.Key.ToString(),
                    Count = g.Count()
                })
                .ToListAsync();

            return Ok(statusCounts);
        }

        [HttpGet("top-selling")]
        public async Task<IActionResult> GetTopSellingCycles()
        {
            var topSelling = await _context.OrderItems
                .GroupBy(oi => oi.Cycle.ModelName)
                .Select(g => new
                {
                    CycleName = g.Key,
                    TotalQuantitySold = g.Sum(x => x.Quantity)
                })
                .OrderByDescending(x => x.TotalQuantitySold)
                .Take(10) // Top 10 best sellers
                .ToListAsync();

            return Ok(topSelling);
        }


        [HttpGet("orders-per-day")]
        public async Task<IActionResult> GetOrdersPerDay()
        {
            var result = await _context.Orders
                .GroupBy(o => o.OrderDate.Date)
                .Select(g => new OrdersPerDayDto
                {
                    Date = g.Key,
                    OrderCount = g.Count()
                })
                .OrderBy(r => r.Date)
                .ToListAsync();

            return Ok(result);
        }






    }


}

