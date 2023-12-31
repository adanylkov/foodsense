using System.Text.Json.Serialization;
using FoodSense.Domain.ValueObjects;

namespace FoodSense.WebApi.DTOs
{
    public class CreateFoodAggregateRequest
    {
        public required string Name { get; init; }
        public required string Barcode { get; init; }
        public required Nutrition Nutrition { get; init; }
        public required IFormFile Image { get; init; }
    }
}