using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CycleStoreAPI.Models
{
    public class CartItem
    {
        [Key]
        public Guid CartItemID { get; set; } = Guid.NewGuid();

        [Required]
        public Guid CustomerID { get; set; }
        [ForeignKey("CustomerID")]
        public Customer Customer { get; set; }

        [Required]
        public Guid CycleID { get; set; }
        [ForeignKey("CycleID")]
        public Cycle Cycle { get; set; }

        [Required]
        public int Quantity { get; set; } = 1;

        public DateTime? AddedAt { get; set; } = DateTime.UtcNow;

    }
}
