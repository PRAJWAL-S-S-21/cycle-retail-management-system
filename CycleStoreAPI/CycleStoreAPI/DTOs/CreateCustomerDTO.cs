using System.ComponentModel.DataAnnotations;

namespace CycleStoreAPI.DTOs
{
    public class CreateCustomerDTO
    {
        [Required, MaxLength(50)]
        public string FirstName { get; set; }

        [Required, MaxLength(50)]
        public string LastName { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        [Required, Phone]
        public string Phone { get; set; }

        [Required]
        public AddressDTO BillingAddress { get; set; }

        [Required]
        public AddressDTO ShippingAddress { get; set; }

        [Required]
        public int LoyaltyPoints { get; set; }
    }
}
