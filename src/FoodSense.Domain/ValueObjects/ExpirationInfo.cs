namespace FoodSense.Domain.ValueObjects;
public record class ExpirationInfo
{
    private readonly DateTime _expirationDate;
    private readonly TimeSpan _expirationFromOpened;
    private readonly IDateTimeProvider _dateTimeProvider;

    public ExpirationInfo(TimeSpan expirationFromOpened, DateTime expirationDate, IDateTimeProvider dateTimeProvider)
    {
        _expirationFromOpened = expirationFromOpened;
        _expirationDate = expirationDate;
        _dateTimeProvider = dateTimeProvider;
    }

    public int DaysToExpiration { get => (ExpirationDate - _dateTimeProvider.Now).Days; }
    public bool IsExpired { get => ExpirationDate < _dateTimeProvider.Now; }
    public bool IsExpiringSoon { get => ExpirationDate - TimeSpan.FromDays(7) < _dateTimeProvider.Now; }
    public DateTime ExpirationDate { get => OpenedAt.HasValue ? OpenedAt.GetValueOrDefault() + _expirationFromOpened : _expirationDate; }
    public DateTime? OpenedAt { get; set; }
}
