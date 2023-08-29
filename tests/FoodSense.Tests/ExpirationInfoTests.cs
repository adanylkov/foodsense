using FoodSense.Domain;
using FoodSense.Domain.Aggregates;
using FoodSense.Domain.ValueObjects;
using FoodSense.Application;
using Moq;

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
    public async Task ExpirationInfoIsOpenedIfGivenCorrectDate()
    {
        var dateTimeProvider = new DateTimeProvider(DateTime.Now);
        var mockRepository = new Mock<IFoodRepository>();
        var barcode = "123456789";
        var testAggregate = new FoodAggregate
        {
            Name = "Test",
            Barcode = barcode,
            Image = "https://www.test.com/test.jpg",
            Nutrition = new Nutrition(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
        };
        var expirationDate = dateTimeProvider.Now.AddDays(5);
        var openedExpiration = TimeSpan.FromHours(2);
        var expectedExpiration = dateTimeProvider.Now + openedExpiration;

        var expirationInfo = new ExpirationInfo(openedExpiration, expirationDate, dateTimeProvider);
        testAggregate.AddItem(expirationInfo);

        mockRepository.Setup(r => r.GetFoodAggregateAsync(barcode)).ReturnsAsync(testAggregate);
        mockRepository.Setup(r => r.SaveChangesAsync());

        var sut = new FoodService(mockRepository.Object, dateTimeProvider);
        await sut.MarkAsOpenedAsync(barcode, expirationDate);

        Assert.NotNull(expirationInfo.OpenedAt);
        Assert.Equal(expectedExpiration, expirationInfo.ExpirationDate);
    }

    [Fact]
    public async Task CorrectExpirationInfoIsOpenedIfMultiplePresent()
    {
        var dateTimeProvider = new DateTimeProvider(DateTime.Now);
        var mockRepository = new Mock<IFoodRepository>();
        var barcode = "123456789";
        var testAggregate = new FoodAggregate
        {
            Name = "Test",
            Barcode = barcode,
            Image = "https://www.test.com/test.jpg",
            Nutrition = new Nutrition(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
        };
        var expirationDate = dateTimeProvider.Now.AddDays(5);
        var openedExpiration = TimeSpan.FromHours(2);
        var expectedExpiration = dateTimeProvider.Now + openedExpiration;
        var expirationInfo = new ExpirationInfo(openedExpiration, expirationDate, dateTimeProvider);

        var expirationDate2 = dateTimeProvider.Now.AddDays(6);
        var openedExpiration2 = TimeSpan.FromHours(2);
        var expirationInfo2 = new ExpirationInfo(openedExpiration2, expirationDate2, dateTimeProvider);

        testAggregate.AddItem(expirationInfo);
        testAggregate.AddItem(expirationInfo2);

        mockRepository.Setup(r => r.GetFoodAggregateAsync(barcode)).ReturnsAsync(testAggregate);
        mockRepository.Setup(r => r.SaveChangesAsync());

        var sut = new FoodService(mockRepository.Object, dateTimeProvider);
        await sut.MarkAsOpenedAsync(barcode, expirationDate);

        Assert.NotNull(expirationInfo.OpenedAt);
        Assert.Equal(expectedExpiration, expirationInfo.ExpirationDate);
        Assert.Null(expirationInfo2.OpenedAt);
    }

    [Fact]
    public async Task OpeningExpirationInfoWithGivenWrongDateThrowsException()
    {
        var dateTimeProvider = new DateTimeProvider(DateTime.Now);
        var mockRepository = new Mock<IFoodRepository>();
        var barcode = "123456789";
        var testAggregate = new FoodAggregate
        {
            Name = "Test",
            Barcode = barcode,
            Image = "https://www.test.com/test.jpg",
            Nutrition = new Nutrition(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
        };
        var expirationDate = dateTimeProvider.Now.AddDays(5);
        var openedExpiration = TimeSpan.FromHours(2);
        var wrongExpiration = dateTimeProvider.Now.AddDays(1);

        var expirationInfo = new ExpirationInfo(openedExpiration, expirationDate, dateTimeProvider);
        testAggregate.AddItem(expirationInfo);

        mockRepository.Setup(r => r.GetFoodAggregateAsync(barcode)).ReturnsAsync(testAggregate);
        mockRepository.Setup(r => r.SaveChangesAsync());

        var sut = new FoodService(mockRepository.Object, dateTimeProvider);
        await Assert.ThrowsAsync<ArgumentException>(() => sut.MarkAsOpenedAsync(barcode, wrongExpiration));
    }

    [Fact]
    public async Task OpeningExpirationInfoThrowsExceptionIfGivenWrongBarcode()
    {
        var dateTimeProvider = new DateTimeProvider(DateTime.Now);
        var mockRepository = new Mock<IFoodRepository>();
        var barcode = "123456789";

        mockRepository.Setup(r => r.GetFoodAggregateAsync(barcode)).ReturnsAsync(null as FoodAggregate);
        mockRepository.Setup(r => r.SaveChangesAsync());

        var sut = new FoodService(mockRepository.Object, dateTimeProvider);
        await Assert.ThrowsAsync<ArgumentException>(() => sut.MarkAsOpenedAsync(barcode, dateTimeProvider.Now));
    }

    [Fact]
    public async Task RemovingExpirationInfoThrowsExceptionIfGivenWrongBarcode()
    {
        var dateTimeProvider = new DateTimeProvider(DateTime.Now);
        var mockRepository = new Mock<IFoodRepository>();
        var barcode = "123456789";

        mockRepository.Setup(r => r.GetFoodAggregateAsync(barcode)).ReturnsAsync(null as FoodAggregate);
        mockRepository.Setup(r => r.SaveChangesAsync());

        var sut = new FoodService(mockRepository.Object, dateTimeProvider);
        await Assert.ThrowsAsync<ArgumentException>(() => sut.DeleteExpiration(barcode, dateTimeProvider.Now));
    }

    [Fact]
    public async Task RemovingExpirationInfoWithGivenWrongDateThrowsException()
    {
        var dateTimeProvider = new DateTimeProvider(DateTime.Now);
        var mockRepository = new Mock<IFoodRepository>();
        var barcode = "123456789";
        var testAggregate = new FoodAggregate
        {
            Name = "Test",
            Barcode = barcode,
            Image = "https://www.test.com/test.jpg",
            Nutrition = new Nutrition(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
        };
        var expirationDate = dateTimeProvider.Now.AddDays(5);
        var openedExpiration = TimeSpan.FromHours(2);
        var wrongExpiration = dateTimeProvider.Now.AddDays(1);

        var expirationInfo = new ExpirationInfo(openedExpiration, expirationDate, dateTimeProvider);
        testAggregate.AddItem(expirationInfo);

        mockRepository.Setup(r => r.GetFoodAggregateAsync(barcode)).ReturnsAsync(testAggregate);
        mockRepository.Setup(r => r.SaveChangesAsync());

        var sut = new FoodService(mockRepository.Object, dateTimeProvider);
        await Assert.ThrowsAsync<ArgumentException>(() => sut.DeleteExpiration(barcode, wrongExpiration));
    }

    [Fact]
    public async Task RemovingExpirationInfoRemovesItFromAggregateIfGivenCorrectDate()
    {
        var dateTimeProvider = new DateTimeProvider(DateTime.Now);
        var mockRepository = new Mock<IFoodRepository>();
        var barcode = "123456789";
        var testAggregate = new FoodAggregate
        {
            Name = "Test",
            Barcode = barcode,
            Image = "https://www.test.com/test.jpg",
            Nutrition = new Nutrition(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
        };
        var expirationDate = dateTimeProvider.Now.AddDays(5);
        var openedExpiration = TimeSpan.FromHours(2);

        var expirationInfo = new ExpirationInfo(openedExpiration, expirationDate, dateTimeProvider);
        testAggregate.AddItem(expirationInfo);

        mockRepository.Setup(r => r.GetFoodAggregateAsync(barcode)).ReturnsAsync(testAggregate);
        mockRepository.Setup(r => r.SaveChangesAsync());

        var sut = new FoodService(mockRepository.Object, dateTimeProvider);

        Assert.Contains(expirationInfo, testAggregate.ExpirationInfos);
        await sut.DeleteExpiration(barcode, expirationDate);
        Assert.DoesNotContain(expirationInfo, testAggregate.ExpirationInfos);
    }


    [Fact]
    public async Task RemovingExpirationInfoRemovesCorrectIfMultiplePresent()
    {
        var dateTimeProvider = new DateTimeProvider(DateTime.Now);
        var mockRepository = new Mock<IFoodRepository>();
        var barcode = "123456789";
        var testAggregate = new FoodAggregate
        {
            Name = "Test",
            Barcode = barcode,
            Image = "https://www.test.com/test.jpg",
            Nutrition = new Nutrition(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
        };
        var expirationDate = dateTimeProvider.Now.AddDays(5);
        var openedExpiration = TimeSpan.FromHours(2);
        var expirationInfo = new ExpirationInfo(openedExpiration, expirationDate, dateTimeProvider);

        var expirationDate2 = dateTimeProvider.Now.AddDays(6);
        var openedExpiration2 = TimeSpan.FromHours(2);
        var secondExpirationInfo = new ExpirationInfo(openedExpiration2, expirationDate2, dateTimeProvider);

        testAggregate.AddItem(expirationInfo);
        testAggregate.AddItem(secondExpirationInfo);

        mockRepository.Setup(r => r.GetFoodAggregateAsync(barcode)).ReturnsAsync(testAggregate);
        mockRepository.Setup(r => r.SaveChangesAsync());

        var sut = new FoodService(mockRepository.Object, dateTimeProvider);

        Assert.Contains(expirationInfo, testAggregate.ExpirationInfos);

        await sut.DeleteExpiration(barcode, expirationDate);

        Assert.DoesNotContain(expirationInfo, testAggregate.ExpirationInfos);
        Assert.Contains(secondExpirationInfo, testAggregate.ExpirationInfos);
    }

    [Fact]
    public async Task RemovingExpirationInfoRemovesOnlyOneIfMultiplePresentWithSameDate()
    {
        var dateTimeProvider = new DateTimeProvider(DateTime.Now);
        var mockRepository = new Mock<IFoodRepository>();
        var barcode = "123456789";
        var testAggregate = new FoodAggregate
        {
            Name = "Test",
            Barcode = barcode,
            Image = "https://www.test.com/test.jpg",
            Nutrition = new Nutrition(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
        };
        var expirationDate = dateTimeProvider.Now.AddDays(5);
        var openedExpiration = TimeSpan.FromHours(2);
        var expirationInfo = new ExpirationInfo(openedExpiration, expirationDate, dateTimeProvider);
        var secondExpirationInfo = new ExpirationInfo(openedExpiration, expirationDate, dateTimeProvider);

        testAggregate.AddItem(expirationInfo);
        testAggregate.AddItem(secondExpirationInfo);

        mockRepository.Setup(r => r.GetFoodAggregateAsync(barcode)).ReturnsAsync(testAggregate);
        mockRepository.Setup(r => r.SaveChangesAsync());

        var sut = new FoodService(mockRepository.Object, dateTimeProvider);

        await sut.DeleteExpiration(barcode, expirationDate);

        Assert.Equal(1, testAggregate.ExpirationInfos.Count);
        Assert.True(testAggregate.ExpirationInfos.Contains(secondExpirationInfo)
            || testAggregate.ExpirationInfos.Contains(expirationInfo));
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