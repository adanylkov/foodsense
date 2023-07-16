using FoodSense.Domain.Aggregates;
using FoodSense.Domain.ValueObjects;

namespace FoodSense.Application;
public interface IFoodService
{
    Task<FoodAggregate?> GetFoodAggregateAsync(string barcode);
    Task<IEnumerable<FoodAggregate>> GetFoodAggregatesAsync();
    Task<FoodAggregate> CreateFoodAggregateAsync(string Name, string Barcode, Nutrition Nutrition, string Image);
    Task<FoodAggregate?> UpdateFoodAggregateAsync(string barcode, string Name, Nutrition Nutrition, string Image);
    Task DeleteFoodAggregateAsync(string barcode);
    Task<IEnumerable<FoodAggregate>> GetExpiringSoonFoodAggregateAsync();
    Task<IEnumerable<FoodAggregate>> GetExpiredFoodAggregateAsync();
    Task AddFoodItemAsync(string barcode, TimeSpan expirationFromOpened, DateTime expirationDate);
}
