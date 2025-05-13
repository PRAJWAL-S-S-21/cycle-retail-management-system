using CycleStoreAPI.Models;

namespace CycleStoreAPI.DTOs
{
    public class PaymentCreateDto
    {
        public Guid OrderId { get; set; }
        public PaymentType PaymentType { get; set; }
        public string? StripePaymentId { get; set; }
        public string? UpiTransactionId { get; set; }
        public string? CardLast4 { get; set; }
        public decimal Amount { get; set; }
        public PaymentStatus Status { get; set; }
        public string? ReceiptUrl { get; set; } 
        public bool ConfirmedByEmployee { get; set; }
    }
}
