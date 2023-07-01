using FoodSense.Domain.ValueObjects;

namespace FoodSense.Domain.Entities;
public class FoodItem
{
    public required string Name { get; set; }
    public required ExpirationInfo ExpirationInfo { get; set; }
}
