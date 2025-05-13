using CycleStoreAPI.Data;
using CycleStoreAPI.DTOs;
using CycleStoreAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CycleStoreAPI.Controllers
{
    [Route("api/brands")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class BrandsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BrandsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Add a Brand
        [HttpPost("add")]
        public async Task<IActionResult> AddBrand([FromBody] Brand brand)
        {
            if (_context.Brands.Any(b => b.Name == brand.Name))
                return BadRequest(new { message = "Brand already exists" });

            brand.BrandID = Guid.NewGuid();
            _context.Brands.Add(brand);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Brand added successfully", brand });
        }

        //View All Brands
        [HttpGet("view-all")]
        public async Task<IActionResult> GetAllBrands()
        {
            var brands = _context.Brands.ToList();
            return Ok(brands);
        }

        // Edit a Brand
        [HttpPut("edit-brand/{brandId}")]
        public async Task<IActionResult> EditBrand(Guid brandId, EditBrandDTO updatedBrand)
        {
            var brand = await _context.Brands.FindAsync(brandId);

            if (brand == null)
                return NotFound(new { message = "Brand Not found" });

            if (_context.Brands.Any(b => b.Name == updatedBrand.Name && b.BrandID != brandId))
                return BadRequest(new { message = "Brand with the same name already exists" });

            if (!string.IsNullOrEmpty(updatedBrand.Name))
            {
                brand.Name = updatedBrand.Name;
            }

            if (!string.IsNullOrEmpty(updatedBrand.Description))
            {
                brand.Description = updatedBrand.Description;
            }

            await _context.SaveChangesAsync();

            return Ok(new { message = "Brand updated successfully" });

        }

        // Delete a Brand
        [HttpDelete("delete-brand/{brandId}")]
        public async Task<IActionResult> DeleteBrand(Guid brandId)
        {
            var brand = await _context.Brands.FindAsync(brandId);

            if (brand == null)
                return NotFound(new { message = "Brand not found" });

            _context.Brands.Remove(brand);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Brand deleted successfully" });
        }

    }
}
