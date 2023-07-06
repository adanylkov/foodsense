
using FoodSense.Domain.ValueObjects;

namespace FoodSense.WebApi.DTOs
{
    public class AddFoodItemRequest
    {
        public required TimeSpan ExpirationFromOpened { get; init; }
        public required DateTime ExpirationDate { get; init; }
    }
}