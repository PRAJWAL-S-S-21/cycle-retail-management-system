using System.ComponentModel.DataAnnotations;

namespace CycleStoreAPI.DTOs
{
    public class AddCycleDTO
    {
        [Required]
        public string SKU { get; set; }

        [Required]
        public string ModelName { get; set; }

        [Required]
        public Guid BrandID { get; set; }

        [Required]
        public Guid TypeID { get; set; }

        public string Description { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public decimal CostPrice { get; set; }

        [Required]
        public int StockQuantity { get; set; }

        public int ReorderThreshold { get; set; }

        public string ImageURL { get; set; } 
    }
}
