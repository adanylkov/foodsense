using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FoodSense.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class FoodAggregateImage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "FoodAggregates",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "FoodAggregates");
        }
    }
}
