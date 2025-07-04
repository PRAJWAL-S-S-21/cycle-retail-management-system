﻿using System.ComponentModel.DataAnnotations;

namespace CycleStoreAPI.DTOs
{
    public class CreateAddressDTO
    {
        [Required, MaxLength(100)]
        public string StreetLine1 { get; set; }

        [MaxLength(100)]
        public string StreetLine2 { get; set; }

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
