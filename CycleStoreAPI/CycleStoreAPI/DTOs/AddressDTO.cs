using System.ComponentModel.DataAnnotations;

namespace CycleStoreAPI.DTOs
{
    public class AddressDTO
    {
        [MaxLength(100)]
        public string? StreetLine1 { get; set; }

        [MaxLength(100)]
        public string? StreetLine2 { get; set; }

        [MaxLength(50)]
        public string? City { get; set; }

        [MaxLength(50)]
        public string? State { get; set; }

        [MaxLength(10)]
        public string? PostalCode { get; set; }

        [MaxLength(50)]
        public string? Country { get; set; }
    }
}
