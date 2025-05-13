using System.ComponentModel.DataAnnotations;

namespace CycleStoreAPI.Models
{
    public class Brand
    {
        [Key]
        public Guid BrandID { get; set; } = Guid.NewGuid();

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }
}
