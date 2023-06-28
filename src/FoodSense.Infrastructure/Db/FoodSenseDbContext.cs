using FoodSense.Domain.Aggregates;
using Microsoft.EntityFrameworkCore;

public class FoodDbContext : DbContext
{
    public DbSet<FoodAggregate> FoodAggregates { get; set; } = null!;


    public FoodDbContext(DbContextOptions<FoodDbContext> options) : base(options)
    {
    }
}
