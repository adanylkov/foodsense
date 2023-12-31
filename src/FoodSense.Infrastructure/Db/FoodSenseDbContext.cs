using FoodSense.Domain.Aggregates;
using FoodSense.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace FoodSense.Infrastructure.Db
{
    public class FoodDbContext : DbContext
    {
        public DbSet<FoodAggregate> FoodAggregates { get; set; } = null!;
        public FoodDbContext(DbContextOptions<FoodDbContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FoodAggregate>(fa =>
            {
                fa.HasKey(x => x.Barcode);
                fa.Property(f => f.ExpirationFromOpened)
                    .HasConversion(new TimeSpanToTicksConverter());
                fa.OwnsMany<ExpirationInfo>("_expirationInfos", fi =>
                {
                    fi.Property(typeof(DateTime), "_expirationDate");
                    fi.Property(typeof(TimeSpan), "_expirationFromOpened")
                        .HasConversion(new TimeSpanToTicksConverter());
                });
                fa.OwnsOne(f => f.Nutrition);
                fa.Ignore(f => f.ExpirationInfos);
            });
        }
    }
}