using FoodSense.Domain;
using FoodSense.Domain.Aggregates;
using FoodSense.Infrastructure.Db;

namespace FoodSense.Infrastructure;
public class FoodRepository : IFoodRepository
{
    private readonly FoodDbContext _dbContext;

    public FoodRepository(FoodDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task AddFoodAggregateAsync(FoodAggregate foodAggregate)
    {
        await _dbContext.FoodAggregates.AddAsync(foodAggregate);
    }

    public async Task DeleteFoodAggregateAsync(string barcode)
    {
        var foodAggregate = await _dbContext.FoodAggregates.FindAsync(barcode) ??
            throw new ArgumentException($"FoodAggregate with barcode {barcode} does not exist");
        _dbContext.FoodAggregates.Remove(foodAggregate);
    }

    public async Task<FoodAggregate> GetFoodAggregateAsync(string barcode)
    {
        return await _dbContext.FoodAggregates.FindAsync(barcode) ??
            throw new ArgumentException($"FoodAggregate with barcode {barcode} does not exist");
    }

    public Task<IEnumerable<FoodAggregate>> GetFoodAggregatesAsync()
    {
        return Task.FromResult(_dbContext.FoodAggregates.AsEnumerable());
    }

    public async Task<IEnumerable<FoodAggregate>> GetFoodAggregatesByPredicateAsync(Func<FoodAggregate, bool> predicate)
    {
        return await Task.Run(() => _dbContext.FoodAggregates.Where(predicate).ToArray());
    }

    public async Task SaveChangesAsync()
    {
        await _dbContext.SaveChangesAsync();
    }

    public async Task UpdateFoodAggregateAsync(FoodAggregate foodAggregate)
    {
        var existingFoodAggregate = await _dbContext.FoodAggregates.FindAsync(foodAggregate.Barcode) ??
            throw new ArgumentException($"FoodAggregate with barcode {foodAggregate.Barcode} does not exist");
        _dbContext.Entry(existingFoodAggregate).CurrentValues.SetValues(foodAggregate);
    }
}