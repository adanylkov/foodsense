using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FoodSense.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UseExpirationInfoInsteadOfFoodItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FoodItem");

            migrationBuilder.CreateTable(
                name: "ExpirationInfo",
                columns: table => new
                {
                    FoodAggregateBarcode = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OpenedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    _expirationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    _expirationFromOpened = table.Column<TimeSpan>(type: "time", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExpirationInfo", x => new { x.FoodAggregateBarcode, x.Id });
                    table.ForeignKey(
                        name: "FK_ExpirationInfo_FoodAggregates_FoodAggregateBarcode",
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
                name: "ExpirationInfo");

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
    }
}
