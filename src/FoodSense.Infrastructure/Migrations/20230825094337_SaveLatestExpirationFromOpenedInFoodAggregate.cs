using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FoodSense.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class SaveLatestExpirationFromOpenedInFoodAggregate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "ExpirationFromOpened",
                table: "FoodAggregates",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ExpirationFromOpened",
                table: "FoodAggregates");
        }
    }
}
