using Serilog;
using FoodSense.Infrastructure.Extensions;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var logger = new LoggerConfiguration()
    .WriteTo.Console()
    .Enrich.FromLogContext()
    .CreateLogger();
// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
builder.Services.RegisterServices();
builder.Services.RegisterDbContext(builder.Configuration);

ApplyMigrations(builder, logger);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();

static void ApplyMigrations(WebApplicationBuilder builder, Serilog.Core.Logger logger)
{
    var scope = builder.Services.BuildServiceProvider().CreateScope();
    var dbContext = scope.ServiceProvider.GetRequiredService<FoodDbContext>();
    var migrations = dbContext.Database.GetPendingMigrations();
    if (migrations.Any())
    {
        logger.Information("Found {Count} pending migrations", migrations.Count());
        foreach (var migration in migrations)
        {
            logger.Information("Applying migration {Migration}", migration);
        }
        dbContext.Database.Migrate();
    }
}