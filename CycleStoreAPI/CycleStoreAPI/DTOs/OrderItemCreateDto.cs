using System.ComponentModel.DataAnnotations;

namespace CycleStoreAPI.DTOs
{
    public class OrderItemCreateDto
    {
        //[Required]
        public Guid OrderId { get; set; }

        [Required]
        public Guid CycleId { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public decimal UnitPrice { get; set; }

        public decimal TaxRate { get; set; }

        [Required]
        public decimal TotalPrice { get; set; }

    }
}
