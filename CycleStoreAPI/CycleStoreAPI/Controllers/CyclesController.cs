using CycleStoreAPI.Data;
using CycleStoreAPI.DTOs;
using CycleStoreAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations.Operations;

namespace CycleStoreAPI.Controllers
{
    [Route("api/cycles")]
    [ApiController]
    [Authorize(Roles = "Admin,Employee")]
    public class CyclesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CyclesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Add a New Cycle
        [HttpPost("add")]
        public async Task<IActionResult> AddCycle([FromBody] AddCycleDTO cycleDTO)
        {
            if (_context.Cycles.Any(c => c.SKU == cycleDTO.SKU))
                return BadRequest(new { message = "Cycle with this SKU already exists" });

            // Ensure Brand & CycleType exist before inserting
            var brandExists = await _context.Brands.AnyAsync(b => b.BrandID == cycleDTO.BrandID);
            var typeExists = await _context.CycleTypes.AnyAsync(t => t.TypeID == cycleDTO.TypeID);

            if (!brandExists || !typeExists)
                return BadRequest(new { message = "Invalid BrandID or TypeID" });

            var cycle = new Cycle
            {
                SKU = cycleDTO.SKU,
                ModelName = cycleDTO.ModelName,
                BrandID = cycleDTO.BrandID,
                TypeID = cycleDTO.TypeID,
                Description = cycleDTO.Description,
                Price = cycleDTO.Price,
                CostPrice = cycleDTO.CostPrice,
                StockQuantity = cycleDTO.StockQuantity,
                ReorderThreshold = cycleDTO.ReorderThreshold,
                ImageURL = cycleDTO.ImageURL
            };

            _context.Cycles.Add(cycle);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Cycle added successfully", cycle });
        }

        // View All Cycles with Brand & Type Details
        [HttpGet("view-all")]
        public async Task<IActionResult> GetAllCycles()
        {
            var cycles = await _context.Cycles
                .Include(c => c.Brand) // ✅ Fetch Brand details
                .Include(c => c.CycleType) // ✅ Fetch CycleType details
                .Select(c => new
                {
                    c.CycleID,
                    c.SKU,
                    c.ModelName,
                    BrandName = c.Brand.Name,
                    TypeName = c.CycleType.Name,
                    c.BrandID,
                    c.TypeID,
                    c.Description,
                    c.Price,
                    c.StockQuantity,
                    c.ImageURL, // ✅ Include Image URL
                    c.CreatedAt
                })
                .ToListAsync();

            return Ok(cycles);
        }

        [HttpGet("view/{cycleId}")]
        public async Task<IActionResult> GetCycleById(Guid cycleId)
        {
            var cycle = await _context.Cycles
                .Include(c => c.Brand)
                .Include(c => c.CycleType)
                .Where(c => c.CycleID == cycleId)
                .Select(c => new
                {
                    c.CycleID,
                    c.SKU,
                    c.ModelName,
                    BrandName = c.Brand.Name,
                    TypeName = c.CycleType.Name,
                    c.BrandID,
                    c.TypeID,
                    c.Description,
                    c.Price,
                    c.CostPrice,
                    c.StockQuantity,
                    c.ReorderThreshold,
                    c.ImageURL,
                    c.IsActive,
                    c.CreatedAt,
                    c.UpdatedAt
                })
                .FirstOrDefaultAsync();

            if (cycle == null)
            {
                return NotFound(new { message = " Cycle not found" });
            }

            return Ok(cycle);

        }

        [HttpPut("edit/{cycleId}")]
        public async Task<IActionResult>EditCycle(Guid cycleId, [FromBody] EditCycleDTO updatedCycle)
        {
            var cycle = await _context.Cycles.FindAsync(cycleId);

            if(cycle == null)
            {
                return NotFound(new { message = "Cycle not found" });
            }

            if (updatedCycle.BrandID.HasValue)
            {
                var brandExits = await _context.Brands.AnyAsync( b => b.BrandID == updatedCycle.BrandID);
                if (!brandExits)
                    return BadRequest(new { mesaage = "Invalid BrandID" });

            }

            if(updatedCycle.TypeID.HasValue)
            {
                var typeExists = await _context.CycleTypes.AnyAsync( t => t.TypeID == updatedCycle.TypeID);
                if (!typeExists)
                    BadRequest( new { messgage = "Invalid TypeID"});
            }

            cycle.SKU = updatedCycle.SKU ?? cycle.SKU;
            cycle.ModelName = updatedCycle.ModelName ?? cycle.ModelName;
            cycle.BrandID = updatedCycle.BrandID ?? cycle.BrandID;
            cycle.TypeID = updatedCycle.TypeID ?? cycle.TypeID;
            cycle.Description = updatedCycle.Description ?? cycle.Description;
            cycle.Price = updatedCycle.Price ?? cycle.Price;
            cycle.CostPrice = updatedCycle.CostPrice ?? cycle.CostPrice;
            cycle.StockQuantity = updatedCycle.StockQuantity ?? cycle.StockQuantity;
            cycle.ReorderThreshold = updatedCycle.ReorderThreshold ?? cycle.ReorderThreshold;
            cycle.ImageURL = updatedCycle.ImageURL ?? cycle.ImageURL;
            cycle.UpdatedAt = DateTime.UtcNow;


            await _context.SaveChangesAsync();
            return Ok(new { message = "Cycle updated successfully" });

        }

        [HttpDelete("delete/{cycleId}")]
        public async Task<IActionResult> DeleteCycle(Guid cycleId)
        {
            var cycle = await _context.Cycles.FindAsync(cycleId);

            if (cycle == null)
                return NotFound(new { message = "Cycle not found" });

            _context.Cycles.Remove(cycle);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Cycle deleted successfully" });
        }
    }
}
