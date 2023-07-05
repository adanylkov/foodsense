
using FoodSense.Domain.ValueObjects;

namespace FoodSense.WebApi.DTOs
{
    public class UpdateFoodAggregateRequest
    {
        public required string Name { get; init; }
        public required Nutrition Nutrition { get; init; }
    }
}