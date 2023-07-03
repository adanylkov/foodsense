using FoodSense.Domain.ValueObjects;

namespace FoodSense.Domain.Entities;
public class FoodItem
{
    public required ExpirationInfo ExpirationInfo { get; set; }
}
