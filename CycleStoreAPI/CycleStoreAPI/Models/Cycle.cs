using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CycleStoreAPI.Models
{
    public class Cycle
    {
        [Key]
        public Guid CycleID { get; set; } = Guid.NewGuid();

        [Required]
        public string SKU { get; set; } // Unique identifier

        [Required]
        public string ModelName { get; set; }

        [Required]
        public Guid BrandID { get; set; } // FK to Brand table

        [ForeignKey("BrandID")]
        public Brand Brand { get; set; }

        [Required]
        public Guid TypeID { get; set; } // FK to CycleType table

        [ForeignKey("TypeID")]
        public CycleType CycleType { get; set; }

        public string Description { get; set; }

        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal Price { get; set; }

        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal CostPrice { get; set; }

        [Required]
        public int StockQuantity { get; set; }

        public int ReorderThreshold { get; set; }

        public bool IsActive { get; set; } = true;

        public string ImageURL { get; set; } // ✅ Stores image path

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }
}
