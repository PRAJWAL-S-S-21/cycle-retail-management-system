using System.ComponentModel.DataAnnotations;

namespace CycleStoreAPI.DTOs
{
    public class LoginDTO
    {
        [Required]
        public string AccountType { get; set; } // Admin or Employee

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
