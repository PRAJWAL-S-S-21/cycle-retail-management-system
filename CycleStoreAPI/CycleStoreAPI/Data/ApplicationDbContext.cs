using CycleStoreAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CycleStoreAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<CycleType> CycleTypes { get; set; }
        public DbSet<Cycle> Cycles { get; set; }
        public DbSet<Customer> Customers { get; set; }
        //public DbSet<Address> Address { get; set; }
        //public DbSet<CartItem> CartItems { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Payment> Payment { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Foreign Key Relationships
            modelBuilder.Entity<Cycle>()
                .HasOne(c => c.Brand)
                .WithMany()
                .HasForeignKey(c => c.BrandID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Cycle>()
                .HasOne(c => c.CycleType)
                .WithMany()
                .HasForeignKey(c => c.TypeID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Customer>().OwnsOne(c => c.BillingAddress);
            modelBuilder.Entity<Customer>().OwnsOne(c => c.ShippingAddress);

            // Address owned by order
            modelBuilder.Entity<Order>().OwnsOne(o => o.ShippingAddress);

            //Order Model
            modelBuilder.Entity<Order>()
                .HasOne(o => o.Customer)
                .WithMany()
                .HasForeignKey(o => o.CustomerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Order>()
                .HasOne(o => o.Employee)
                .WithMany()
                .HasForeignKey(o => o.EmployeeId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Order>()
                .HasMany(o => o.OrderItems)
                .WithOne(oi => oi.Order)
                .HasForeignKey(oi => oi.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Order>()
                .HasOne(o => o.Payment)
                .WithOne(p => p.Order)
                .HasForeignKey<Payment>(p => p.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            // OrderItem Model
            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.Order)
                .WithMany(o => o.OrderItems)
                .HasForeignKey(oi => oi.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.Cycle)
                .WithMany()
                .HasForeignKey(oi => oi.CycleId)
                .OnDelete(DeleteBehavior.Cascade);

            // payment Model
            modelBuilder.Entity<Payment>()
                .HasOne(p => p.Order)
                .WithOne(o => o.Payment)
                .HasForeignKey<Payment>(p => p.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

        }
    }
}
