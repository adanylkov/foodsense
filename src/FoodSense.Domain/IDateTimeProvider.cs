namespace FoodSense.Domain;

public interface IDateTimeProvider
{
    DateTime Now { get; }
}