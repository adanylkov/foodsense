using FoodSense.Domain;
using FoodSense.Domain.Aggregates;
using FoodSense.Domain.ValueObjects;

namespace FoodSense.Application;
public class FoodService : IFoodService
{
    private readonly IFoodRepository _foodRepository;

    public FoodService(IFoodRepository foodRepository)
    {
        _foodRepository = foodRepository;
    }

    public async Task<FoodAggregate> CreateFoodAggregateAsync(string Name, string Barcode, Nutrition Nutrition)
    {
        var food = new FoodAggregate
        {
            Name = Name,
            Barcode = Barcode,
            Nutrition = Nutrition
        };

        await _foodRepository.AddFoodAggregateAsync(food);
        await _foodRepository.SaveChangesAsync();

        return food;
    }

    public async Task DeleteFoodAggregateAsync(string barcode)
    {
        await _foodRepository.DeleteFoodAggregateAsync(barcode);
        await _foodRepository.SaveChangesAsync();
    }

    public Task<IEnumerable<FoodAggregate>> GetExpiredFoodAggregateAsync()
    {
        // TODO Search in database instead of in memory
        return Task.FromResult(_foodRepository.GetFoodAggregatesAsync().Result.Where(f => f.GetExpiredItems().Any()));
    }

    public Task<IEnumerable<FoodAggregate>> GetExpiringSoonFoodAggregateAsync()
    {
        // TODO Search in database instead of in memory
        return Task.FromResult(_foodRepository.GetFoodAggregatesAsync().Result.Where(f => f.GetExpiringItems().Any()));
    }

    public async Task<FoodAggregate> GetFoodAggregateAsync(string barcode)
    {
        return await _foodRepository.GetFoodAggregateAsync(barcode);
    }

    public Task<IEnumerable<FoodAggregate>> GetFoodAggregatesAsync()
    {
        return _foodRepository.GetFoodAggregatesAsync();
    }

    public async Task<FoodAggregate> UpdateFoodAggregateAsync(FoodAggregate food)
    {
        await _foodRepository.UpdateFoodAggregateAsync(food);
        await _foodRepository.SaveChangesAsync();

        return food;
    }
}
