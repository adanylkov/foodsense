using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FoodSense.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ConvertTimeSpanToTicks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "_expirationFromOpened",
                table: "ExpirationInfo",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "_expirationFromOpened",
                table: "ExpirationInfo");
        }
    }
}
