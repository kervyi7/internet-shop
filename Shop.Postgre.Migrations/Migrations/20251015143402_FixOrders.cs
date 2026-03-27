using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Shop.Postgre.Migrations.Migrations
{
    /// <inheritdoc />
    public partial class FixOrders : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedByUser",
                schema: "public",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "UpdatedByUser",
                schema: "public",
                table: "Order");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CreatedByUser",
                schema: "public",
                table: "Order",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UpdatedByUser",
                schema: "public",
                table: "Order",
                type: "character varying(600)",
                maxLength: 600,
                nullable: false,
                defaultValue: "");
        }
    }
}
