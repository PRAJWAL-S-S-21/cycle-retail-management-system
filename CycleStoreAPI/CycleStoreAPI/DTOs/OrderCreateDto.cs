using System.ComponentModel.DataAnnotations;
using CycleStoreAPI.Models;

namespace CycleStoreAPI.DTOs
{
    public class OrderCreateDto
    {
        public Guid CustomerId { get; set; }
        public int EmployeeId { get; set; }
        public decimal Subtotal { get; set; }
        public decimal Tax { get; set; }
        public decimal Discount { get; set; }
        public decimal TotalAmount { get; set; }
        public string Notes { get; set; }
        public AddressDTO ShippingAddress { get; set; }

        [Required]
        public List<OrderItemCreateDto> OrderItems { get; set; }

        [Required]
        public PaymentCreateDto Payment { get; set; }

    }

}
