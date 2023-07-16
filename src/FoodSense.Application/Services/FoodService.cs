using FoodSense.Domain;
using FoodSense.Domain.Aggregates;
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
        var expirationInfo = new ExpirationInfo(expirationFromOpened, expirationDate, _dateTimeProvider);
        foodAggregate.AddItem(expirationInfo);
        await _foodRepository.SaveChangesAsync();
    }

    public async Task<FoodAggregate> CreateFoodAggregateAsync(string Name, string barcode, Nutrition nutrition, string image)
    {
        var food = new FoodAggregate
        {
            Name = Name,
            Barcode = barcode,
            Nutrition = nutrition,
            Image = image,
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

    public async Task<FoodAggregate?> UpdateFoodAggregateAsync(string barcode, string name, Nutrition nutrition, string image)
    {
        var food = new FoodAggregate {
            Barcode = barcode,
            Name = name,
            Nutrition = nutrition,
            Image = image,
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
