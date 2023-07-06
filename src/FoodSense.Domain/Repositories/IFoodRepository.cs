using FoodSense.Domain.Aggregates;

namespace FoodSense.Domain;
public interface IFoodRepository
{
    Task<IEnumerable<FoodAggregate>> GetFoodAggregatesAsync();
    Task<FoodAggregate> GetFoodAggregateAsync(string barcode);
    Task AddFoodAggregateAsync(FoodAggregate foodAggregate);
    Task UpdateFoodAggregateAsync(FoodAggregate foodAggregate);
    Task DeleteFoodAggregateAsync(string barcode);
    Task SaveChangesAsync();
    Task<IEnumerable<FoodAggregate>> GetFoodAggregatesByPredicateAsync(Func<FoodAggregate, bool> predicate);
}
