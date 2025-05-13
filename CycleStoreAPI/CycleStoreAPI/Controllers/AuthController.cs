using CycleStoreAPI.Data;
using CycleStoreAPI.DTOs;
using CycleStoreAPI.Models;
using CycleStoreAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CycleStoreAPI.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly AuthService _authService;

        public AuthController(ApplicationDbContext context, AuthService authService)
        {
            _context = context;
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDto)
        {
            // Check if user exists with the given email
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginDto.Email);

            if (existingUser == null || !_authService.VerifyPassword(loginDto.Password, existingUser.PasswordHash))
                return Unauthorized(new { message = "Invalid credentials" });

            // Check if the role matches the AccountType
            if (!string.Equals(existingUser.Role, loginDto.AccountType, StringComparison.OrdinalIgnoreCase))
                return Unauthorized(new { message = "Incorrect account type" });

            // Generate JWT token
            var token = _authService.GenerateToken(existingUser);
            return Ok(new
            {
                token,
                role = existingUser.Role,
                message = $"{existingUser.Role} login is successful"
            });
        }
    }
}
