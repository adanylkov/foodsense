using FoodSense.Domain.Aggregates;
using FoodSense.Domain.ValueObjects;

namespace FoodSense.Application;
public interface IFoodService
{
    Task<FoodAggregate> GetFoodAggregateAsync(string barcode);
    Task<IEnumerable<FoodAggregate>> GetFoodAggregatesAsync();
    Task<FoodAggregate> CreateFoodAggregateAsync(string Name, string Barcode, Nutrition Nutrition);
    Task<FoodAggregate> UpdateFoodAggregateAsync(string barcode, string Name, Nutrition Nutrition);
    Task DeleteFoodAggregateAsync(string barcode);
    Task<IEnumerable<FoodAggregate>> GetExpiringSoonFoodAggregateAsync();
    Task<IEnumerable<FoodAggregate>> GetExpiredFoodAggregateAsync();
}
