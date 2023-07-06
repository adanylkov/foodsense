using FoodSense.Domain;
using FoodSense.Domain.Aggregates;
using FoodSense.Domain.Entities;
using FoodSense.Domain.ValueObjects;

namespace FoodSense.Application;
public class FoodService : IFoodService
{
    private readonly IFoodRepository _foodRepository;
    private readonly IDateTimeProvider _dateTimeProvider;

    public FoodService(IFoodRepository foodRepository, IDateTimeProvider dateTimeProvider)
    {
        _foodRepository = foodRepository;
        _dateTimeProvider = dateTimeProvider;
    }

    public async Task AddFoodItemAsync(string barcode, TimeSpan expirationFromOpened, DateTime expirationDate)
    {
        var foodAggregate = await _foodRepository.GetFoodAggregateAsync(barcode);
        var foodItem = new FoodItem
        {
            ExpirationInfo = new ExpirationInfo(expirationFromOpened, expirationDate, _dateTimeProvider)
        };
        foodAggregate.AddItem(foodItem);
        await _foodRepository.SaveChangesAsync();
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

    public async Task<IEnumerable<FoodAggregate>> GetExpiredFoodAggregateAsync()
    {
        return await _foodRepository.GetFoodAggregatesByPredicateAsync(f => f.GetExpiredItems().Any());
    }

    public async Task<IEnumerable<FoodAggregate>> GetExpiringSoonFoodAggregateAsync()
    {
        return await _foodRepository.GetFoodAggregatesByPredicateAsync(f => f.GetExpiringItems().Any());
    }

    public async Task<FoodAggregate?> GetFoodAggregateAsync(string barcode)
    {
        try
        {
            return await _foodRepository.GetFoodAggregateAsync(barcode);
        }
        catch (ArgumentException)
        {
            return null;
        }
    }

    public Task<IEnumerable<FoodAggregate>> GetFoodAggregatesAsync()
    {
        return _foodRepository.GetFoodAggregatesAsync();
    }

    public async Task<FoodAggregate?> UpdateFoodAggregateAsync(string barcode, string Name, Nutrition Nutrition)
    {
        var food = new FoodAggregate {
            Barcode = barcode,
            Name = Name,
            Nutrition = Nutrition
        };
        try
        {
            await _foodRepository.UpdateFoodAggregateAsync(food);
        }
        catch (ArgumentException)
        {
            return null;
        }
        await _foodRepository.SaveChangesAsync();

        return food;
    }
}
