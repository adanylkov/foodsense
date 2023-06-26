using FoodSense.Domain;

internal class DateTimeProvider : IDateTimeProvider
{
    public DateTime Now => DateTime.Now;
}