using CycleStoreAPI.Data;
using CycleStoreAPI.DTOs;
using CycleStoreAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CycleStoreAPI.Controllers
{
    [Route("api/cycletypes")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class CycleTypesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CycleTypesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ✅ Add a Cycle Type
        [HttpPost("add")]
        public async Task<IActionResult> AddCycleType([FromBody] CycleType type)
        {
            if (_context.CycleTypes.Any(t => t.Name == type.Name))
                return BadRequest(new { message = "Cycle type already exists" });

            type.TypeID = Guid.NewGuid();
            _context.CycleTypes.Add(type);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Cycle type added successfully", type });
        }

        // 2. View All Cycle Types
        [HttpGet("view-all")]
        public async Task<IActionResult> GetAllCycleTypes()
        {
            var types = _context.CycleTypes.ToList();
            return Ok(types);
        }

        // Edit a Cycle Type
        [HttpPut("edit-cycle-type/{typeId}")]
        public async Task<IActionResult> EditCycleType(Guid typeId, EditCycleTypeDTO updatedType)
        {
            var cycleType = await _context.CycleTypes.FindAsync(typeId);

            if (cycleType == null)
                return NotFound(new { message = "Cycle type not found" });

            if (_context.CycleTypes.Any(t => t.Name == updatedType.Name && t.TypeID != typeId))
                return BadRequest(new { message = "Cycle type with the same name already exists" });

            if (!string.IsNullOrEmpty(updatedType.Name))
            {
                cycleType.Name = updatedType.Name;
            }

            await _context.SaveChangesAsync();

            return Ok(new { message = "Cycle type updated successfully" });
        }

        //  Delete a Cycle Type
        [HttpDelete("delete-cycle-type/{typeId}")]
        public async Task<IActionResult> DeleteCycleType(Guid typeId)
        {
            var cycleType = await _context.CycleTypes.FindAsync(typeId);

            if (cycleType == null)
                return NotFound(new { message = "Cycle type not found" });

            _context.CycleTypes.Remove(cycleType);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Cycle type deleted successfully" });
        }


    }
}
