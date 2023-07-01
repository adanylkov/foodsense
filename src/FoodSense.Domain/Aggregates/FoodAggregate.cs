using FoodSense.Domain.Entities;
using FoodSense.Domain.ValueObjects;

namespace FoodSense.Domain.Aggregates;

public class FoodAggregate
{
    private readonly List<FoodItem> _foodItems = new();
    public required string Barcode { get; init; }
    public required Nutrition Nutrition { get; set; }
    public void AddItem(FoodItem foodItem)
    {
        _foodItems.Add(foodItem);
    }
    public void RemoveItem(FoodItem foodItem)
    {
        _foodItems.Remove(foodItem);
    }
    public IReadOnlyCollection<FoodItem> GetExpiredItems()
    {
        return _foodItems.Where(x => x.ExpirationInfo.IsExpired).ToArray();
    }
    public IReadOnlyCollection<FoodItem> GetExpiringItems()
    {
        return _foodItems.Where(x => x.ExpirationInfo.IsExpiringSoon).ToArray();
    }
}