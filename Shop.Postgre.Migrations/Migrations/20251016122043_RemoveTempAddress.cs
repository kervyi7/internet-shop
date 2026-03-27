using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Shop.Postgre.Migrations.Migrations
{
    /// <inheritdoc />
    public partial class RemoveTempAddress : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TempApartment",
                schema: "public",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "TempCity",
                schema: "public",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "TempCountry",
                schema: "public",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "TempEmail",
                schema: "public",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "TempFirstName",
                schema: "public",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "TempHouseNumber",
                schema: "public",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "TempLastName",
                schema: "public",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "TempNotes",
                schema: "public",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "TempPhone",
                schema: "public",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "TempPostcode",
                schema: "public",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "TempStreet",
                schema: "public",
                table: "Order");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TempApartment",
                schema: "public",
                table: "Order",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TempCity",
                schema: "public",
                table: "Order",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TempCountry",
                schema: "public",
                table: "Order",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TempEmail",
                schema: "public",
                table: "Order",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TempFirstName",
                schema: "public",
                table: "Order",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TempHouseNumber",
                schema: "public",
                table: "Order",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TempLastName",
                schema: "public",
                table: "Order",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TempNotes",
                schema: "public",
                table: "Order",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TempPhone",
                schema: "public",
                table: "Order",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TempPostcode",
                schema: "public",
                table: "Order",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TempStreet",
                schema: "public",
                table: "Order",
                type: "text",
                nullable: true);
        }
    }
}
