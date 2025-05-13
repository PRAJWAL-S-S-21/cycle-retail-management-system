using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace CycleStoreAPI.Models
{
    [Owned]
    public class Address
    {
        [Required, MaxLength(100)]
        public string StreetLine1 { get; set; }

        [MaxLength(100)]
        public string? StreetLine2 { get; set; }

        [Required, MaxLength(50)]
        public string City { get; set; }

        [Required, MaxLength(50)]
        public string State { get; set; }

        [Required, MaxLength(10)]
        public string PostalCode { get; set; }

        [Required, MaxLength(50)]
        public string Country { get; set; }

    }
}
