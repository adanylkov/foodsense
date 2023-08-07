using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FoodSense.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RemoveTimeSpanColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "_expirationFromOpened",
                table: "ExpirationInfo");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<TimeSpan>(
                name: "_expirationFromOpened",
                table: "ExpirationInfo",
                type: "time",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));
        }
    }
}
