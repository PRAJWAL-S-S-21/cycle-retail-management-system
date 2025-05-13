using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CycleStoreAPI.Models
{
    public class Payment
    {
        [Key]
        public Guid PaymentId { get; set; } = Guid.NewGuid();

        [Required]
        public Guid OrderId { get; set; }
        // 🔗 Navigation
        [ForeignKey("OrderId")]
        public Order Order { get; set; }

        [Required]
        public PaymentType PaymentType { get; set; }

        // Optional fields depending on method
        public string? StripePaymentId { get; set; }

        public string? UpiTransactionId { get; set; }

        public string? CardLast4 { get; set; }

        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal Amount { get; set; }

        public PaymentStatus Status { get; set; } = PaymentStatus.PENDING;

        //public string? ReceiptUrl { get; set; }

        public bool ConfirmedByEmployee { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

    }

    public enum PaymentType
    {
        CASH,
        UPI,
        CARD
    }

    public enum PaymentStatus
    {
        PENDING,
        SUCCESS,
        FAILED
    }

}
