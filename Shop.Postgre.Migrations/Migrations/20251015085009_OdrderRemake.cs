using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Shop.Postgre.Migrations.Migrations
{
    /// <inheritdoc />
    public partial class OdrderRemake : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Property<DateTime>_Product_ProductId",
                schema: "public",
                table: "Property<DateTime>");

            migrationBuilder.DropColumn(
                name: "Avatar",
                schema: "public",
                table: "IdentityUser");

            migrationBuilder.DropColumn(
                name: "Language",
                schema: "public",
                table: "IdentityUser");

            migrationBuilder.RenameColumn(
                name: "SalePrice",
                schema: "public",
                table: "Product",
                newName: "DiscountedPrice");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                schema: "public",
                table: "Order",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<int>(
                name: "DeliveryAddressId",
                schema: "public",
                table: "Order",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Property<DateTime>_Product_ProductId",
                schema: "public",
                table: "Property<DateTime>",
                column: "ProductId",
                principalSchema: "public",
                principalTable: "Product",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Property<DateTime>_Product_ProductId",
                schema: "public",
                table: "Property<DateTime>");

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

            migrationBuilder.RenameColumn(
                name: "DiscountedPrice",
                schema: "public",
                table: "Product",
                newName: "SalePrice");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                schema: "public",
                table: "Order",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "DeliveryAddressId",
                schema: "public",
                table: "Order",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Avatar",
                schema: "public",
                table: "IdentityUser",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Language",
                schema: "public",
                table: "IdentityUser",
                type: "character varying(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Property<DateTime>_Product_ProductId",
                schema: "public",
                table: "Property<DateTime>",
                column: "ProductId",
                principalSchema: "public",
                principalTable: "Product",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
