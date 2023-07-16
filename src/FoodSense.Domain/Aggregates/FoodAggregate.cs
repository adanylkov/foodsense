using FoodSense.Domain.ValueObjects;

namespace FoodSense.Domain.Aggregates;

public class FoodAggregate
{
    private readonly List<ExpirationInfo> _expirationInfos = new();
    public required string Name { get; set; }
    public required string Barcode { get; init; }
    public required Nutrition Nutrition { get; set; }
    public required string Image { get; set; }
    public IReadOnlyList<ExpirationInfo> ExpirationInfos => _expirationInfos.AsReadOnly();
    public void AddItem(ExpirationInfo expirationInfo)
    {
        _expirationInfos.Add(expirationInfo);
    }
    public void RemoveItem(ExpirationInfo expirationInfo)
    {
        _expirationInfos.Remove(expirationInfo);
    }
    public IReadOnlyCollection<ExpirationInfo> GetExpiredItems()
    {
        return _expirationInfos.Where(x => x.IsExpired).ToArray();
    }
    public IReadOnlyCollection<ExpirationInfo> GetExpiringItems()
    {
        return _expirationInfos.Where(x => x.IsExpiringSoon).ToArray();
    }
}