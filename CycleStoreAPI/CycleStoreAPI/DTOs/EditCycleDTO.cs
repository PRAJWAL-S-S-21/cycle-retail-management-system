namespace CycleStoreAPI.DTOs
{
    public class EditCycleDTO
    {
        public string? SKU { get; set; }
        public string? ModelName { get; set; }
        public Guid? BrandID { get; set; }
        public Guid? TypeID { get; set; }
        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public decimal? CostPrice { get; set; }
        public int? StockQuantity { get; set; }
        public int? ReorderThreshold { get; set; }
        public string? ImageURL { get; set; }
    }
}
