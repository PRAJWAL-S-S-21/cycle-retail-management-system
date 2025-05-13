using System.ComponentModel.DataAnnotations;

namespace CycleStoreAPI.Models
{
    public class CycleType
    {
        [Key]
        public Guid TypeID { get; set; } = Guid.NewGuid();

        [Required]
        public string Name { get; set; } // Example: Mountain Bike, Road Bike, Hybrid

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }
}
