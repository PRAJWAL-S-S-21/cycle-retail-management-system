namespace CycleStoreAPI.DTOs
{
    public class CartItemResponseDTO
    {
        public Guid CartItemID { get; set; }
        public Guid CustomerID { get; set; }
        public Guid CycleID { get; set; }
        public string ModelName { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public DateTime AddedAt { get; set; }
    }

}
