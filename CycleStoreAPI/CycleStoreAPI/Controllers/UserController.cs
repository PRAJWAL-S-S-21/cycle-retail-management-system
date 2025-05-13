using CycleStoreAPI.Data;
using CycleStoreAPI.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CycleStoreAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
                return NotFound(new { message = "User not found." });

            return Ok(user);
        }

        [HttpPut("edit-employee/{id}")]
        public async Task<IActionResult> EditEmployee(int id, [FromBody] EditEmployeeDTO updatedEmployee)
        {
            var employee = await _context.Users.FindAsync(id);
            if (employee == null)
            {
                return NotFound(new { message = "Employee not found" });
            }

            if (!string.IsNullOrEmpty(updatedEmployee.Username))
                employee.Username = updatedEmployee.Username;

            if (!string.IsNullOrEmpty(updatedEmployee.Email))
                employee.Email = updatedEmployee.Email;

            if (!string.IsNullOrEmpty(updatedEmployee.Role))
                employee.Role = updatedEmployee.Role;

            // Hash the new password before saving
            if (!string.IsNullOrEmpty(updatedEmployee.Password))
            {
                employee.PasswordHash = BCrypt.Net.BCrypt.HashPassword(updatedEmployee.Password);
            }

            employee.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Employee updated successfully" });
        }

        [HttpGet("employees/count")]
        public async Task<ActionResult<int>> GetEmployeeCount()
        {
            var count = await _context.Users.CountAsync(u => u.Role == "Employee");
            return Ok(count);
        }

    }
}
