using FoodSense.Domain;
using Microsoft.Extensions.DependencyInjection;

namespace FoodSense.Infrastructure;
public class RegisterDependencies
{
    public static void Register(IServiceCollection services)
    {
        services.AddSingleton<IDateTimeProvider, DateTimeProvider>();
    }
}
