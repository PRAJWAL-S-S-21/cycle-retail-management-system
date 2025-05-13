namespace CycleStoreAPI.DTOs
{
    public class UpdateCustomerDTO
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public int? LoyaltyPoints { get; set; }
        public AddressDTO? BillingAddress { get; set; }
        public AddressDTO? ShippingAddress { get; set; }
    }
}
