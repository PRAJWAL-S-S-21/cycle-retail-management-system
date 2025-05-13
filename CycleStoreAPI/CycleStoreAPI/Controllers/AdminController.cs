using CycleStoreAPI.Data;
using CycleStoreAPI.DTOs;
using CycleStoreAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CycleStoreAPI.Controllers
{
    [Route("api/admin")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdminController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("register-employee")]
        public async Task<IActionResult> RegisterEmployee([FromBody] User employee)
        {
            if (_context.Users.Any(u => u.Email == employee.Email))
                return BadRequest(new { message = "Email already exists" });

            employee.PasswordHash = BCrypt.Net.BCrypt.HashPassword(employee.PasswordHash);
            employee.Role = "Employee";
            _context.Users.Add(employee);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Employee registered successfully" });
        }

        // API to View All Employees
        [HttpGet("view-employees")]
        public async Task<IActionResult> GetEmployees()
        {
            var employees = await _context.Users
                .Where(u => u.Role == "Employee") 
                .Select(u => new
                {
                    u.UserID,
                    u.Username,
                    u.Email,
                    u.Role,
                    u.CreatedAt
                })
                .ToListAsync();

            if (employees.Count == 0)
                return NotFound(new { message = "No employees found" });

            return Ok(employees);
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


        //Delete Employee API
        [HttpDelete("delete-employee/{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Users.FindAsync(id);
            if (employee == null)
            {
                return NotFound(new { message = "Employee not found" });
            }

            _context.Users.Remove(employee);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Employee deleted successfully" });
        }
    }
}
