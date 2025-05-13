namespace CycleStoreAPI.DTOs
{
    public class CreateCartItemDTO
    {
        public Guid CustomerID { get; set; }
        public Guid CycleID { get; set; }
        public int Quantity { get; set; }
    }

}
