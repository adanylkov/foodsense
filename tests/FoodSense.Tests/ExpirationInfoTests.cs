using System.Net.Http.Headers;
using FoodSense.Domain;
using FoodSense.Domain.Aggregates;
using FoodSense.Domain.ValueObjects;

namespace FoodSense.Tests;

public class ExpirationInfoTests
{
    [Fact]
    public void ExpiredFoodReturnsTrue()
    {
        var dateTimeProvider = new DateTimeProvider(DateTime.Now);
        var expirationInfo = new ExpirationInfo(TimeSpan.Zero, DateTime.Now.AddDays(-1), dateTimeProvider);
        Assert.True(expirationInfo.IsExpired);
    }

    [Fact]
    public void NotExpiredFoodReturnsFalse()
    {
        var dateTimeProvider = new DateTimeProvider(DateTime.Now);
        var expirationInfo = new ExpirationInfo(TimeSpan.Zero, DateTime.Now.AddDays(1), dateTimeProvider);
        Assert.False(expirationInfo.IsExpired);
    }
    [Fact]
    public void ExpirationInfoReturnsCorrectDaysUntilExpiration()
    {
        var dateTimeProvider = new DateTimeProvider(DateTime.Now);
        var expirationInfo = new ExpirationInfo(TimeSpan.Zero, DateTime.Now.AddDays(5), dateTimeProvider);
        Assert.Equal(5, expirationInfo.DaysToExpiration);
    }
    [Fact]
    public void ExpirationInfoUsesOpenedDateIfPresent()
    {
        var dateTimeProvider = new DateTimeProvider(DateTime.Now);
        var expirationInfo = new ExpirationInfo(TimeSpan.FromDays(4), DateTime.Now.AddDays(-5), dateTimeProvider)
        {
            OpenedAt = DateTime.Now.AddDays(-2)
        };
        Assert.Equal(2, expirationInfo.DaysToExpiration);
    }
    [Fact]
    public void ExpirationInfoReturnsTrueIfExpiringWithinWeek()
    {
        var dateTimeProvider = new DateTimeProvider(DateTime.Now);
        var expirationInfo = new ExpirationInfo(TimeSpan.Zero, DateTime.Now.AddDays(6), dateTimeProvider);
        Assert.True(expirationInfo.IsExpiringSoon);
    }
    [Fact]
    public void ExpirationInfoReturnsFalseIfExpiringAfterWeekOrLater()
    {
        var dateTimeProvider = new DateTimeProvider(DateTime.Now);
        var productExpirationDate = DateTime.Now.AddDays(7).AddHours(1);
        var expirationInfo = new ExpirationInfo(TimeSpan.Zero, productExpirationDate, dateTimeProvider);
        Assert.False(expirationInfo.IsExpiringSoon);
    }
    [Fact]
    public void ExpirationInfoIsOpenedIfGivenCorrectDate()
    {
        Assert.Fail("Not implemented");
    }
}

internal class DateTimeProvider : IDateTimeProvider
{
    private readonly DateTime _mockedDateTime;

    public DateTimeProvider(DateTime mockedDateTime)
    {
        _mockedDateTime = mockedDateTime;
    }

    public DateTime Now => _mockedDateTime;
}