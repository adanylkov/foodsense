using FoodSense.Domain;

public class DateTimeProvider : IDateTimeProvider
{
    public DateTime Now => DateTime.Now;
}