using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FoodSense.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FoodAggregates",
                columns: table => new
                {
                    Barcode = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Nutrition_Calories = table.Column<double>(type: "float", nullable: false),
                    Nutrition_Fat = table.Column<double>(type: "float", nullable: false),
                    Nutrition_Carbohydrates = table.Column<double>(type: "float", nullable: false),
                    Nutrition_Protein = table.Column<double>(type: "float", nullable: false),
                    Nutrition_Sodium = table.Column<double>(type: "float", nullable: false),
                    Nutrition_Sugar = table.Column<double>(type: "float", nullable: false),
                    Nutrition_Fiber = table.Column<double>(type: "float", nullable: false),
                    Nutrition_Cholesterol = table.Column<double>(type: "float", nullable: false),
                    Nutrition_SaturatedFat = table.Column<double>(type: "float", nullable: false),
                    Nutrition_TransFat = table.Column<double>(type: "float", nullable: false),
                    Nutrition_UnsaturatedFat = table.Column<double>(type: "float", nullable: false),
                    Nutrition_Potassium = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FoodAggregates", x => x.Barcode);
                });

            migrationBuilder.CreateTable(
                name: "FoodItem",
                columns: table => new
                {
                    FoodAggregateBarcode = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ExpirationInfo_OpenedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ExpirationInfo__expirationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ExpirationInfo__expirationFromOpened = table.Column<TimeSpan>(type: "time", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FoodItem", x => new { x.FoodAggregateBarcode, x.Id });
                    table.ForeignKey(
                        name: "FK_FoodItem_FoodAggregates_FoodAggregateBarcode",
                        column: x => x.FoodAggregateBarcode,
                        principalTable: "FoodAggregates",
                        principalColumn: "Barcode",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FoodItem");

            migrationBuilder.DropTable(
                name: "FoodAggregates");
        }
    }
}
