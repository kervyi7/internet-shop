using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Shop.Postgre.Migrations.Migrations
{
    /// <inheritdoc />
    public partial class FixImages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedByUser",
                schema: "public",
                table: "PropertyTemplate");

            migrationBuilder.DropColumn(
                name: "UpdatedByUser",
                schema: "public",
                table: "PropertyTemplate");

            migrationBuilder.DropColumn(
                name: "CreatedByUser",
                schema: "public",
                table: "Property<string>");

            migrationBuilder.DropColumn(
                name: "UpdatedByUser",
                schema: "public",
                table: "Property<string>");

            migrationBuilder.DropColumn(
                name: "CreatedByUser",
                schema: "public",
                table: "Property<decimal>");

            migrationBuilder.DropColumn(
                name: "UpdatedByUser",
                schema: "public",
                table: "Property<decimal>");

            migrationBuilder.DropColumn(
                name: "CreatedByUser",
                schema: "public",
                table: "Property<bool>");

            migrationBuilder.DropColumn(
                name: "UpdatedByUser",
                schema: "public",
                table: "Property<bool>");

            migrationBuilder.DropColumn(
                name: "CreatedByUser",
                schema: "public",
                table: "Property<DateTime>");

            migrationBuilder.DropColumn(
                name: "UpdatedByUser",
                schema: "public",
                table: "Property<DateTime>");

            migrationBuilder.DropColumn(
                name: "CreatedByUser",
                schema: "public",
                table: "ProductType");

            migrationBuilder.DropColumn(
                name: "UpdatedByUser",
                schema: "public",
                table: "ProductType");

            migrationBuilder.DropColumn(
                name: "CreatedByUser",
                schema: "public",
                table: "ProductBrand");

            migrationBuilder.DropColumn(
                name: "UpdatedByUser",
                schema: "public",
                table: "ProductBrand");

            migrationBuilder.DropColumn(
                name: "CreatedByUser",
                schema: "public",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "UpdatedByUser",
                schema: "public",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "CreatedByUser",
                schema: "public",
                table: "Image");

            migrationBuilder.DropColumn(
                name: "IsTitle",
                schema: "public",
                table: "Image");

            migrationBuilder.DropColumn(
                name: "UpdatedByUser",
                schema: "public",
                table: "Image");

            migrationBuilder.DropColumn(
                name: "CreatedByUser",
                schema: "public",
                table: "Category");

            migrationBuilder.DropColumn(
                name: "UpdatedByUser",
                schema: "public",
                table: "Category");

            migrationBuilder.AddColumn<bool>(
                name: "IsTitle",
                schema: "public",
                table: "ProductImage",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                schema: "public",
                table: "Product",
                type: "character varying(5000)",
                maxLength: 5000,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(2000)",
                oldMaxLength: 2000,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Notes",
                schema: "public",
                table: "Order",
                type: "character varying(200)",
                maxLength: 200,
                nullable: true,
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

            migrationBuilder.CreateIndex(
                name: "IX_ProductImage_ProductId_IsTitle",
                schema: "public",
                table: "ProductImage",
                columns: new[] { "ProductId", "IsTitle" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ProductImage_ProductId_IsTitle",
                schema: "public",
                table: "ProductImage");

            migrationBuilder.DropColumn(
                name: "IsTitle",
                schema: "public",
                table: "ProductImage");

            migrationBuilder.AddColumn<string>(
                name: "CreatedByUser",
                schema: "public",
                table: "PropertyTemplate",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UpdatedByUser",
                schema: "public",
                table: "PropertyTemplate",
                type: "character varying(600)",
                maxLength: 600,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CreatedByUser",
                schema: "public",
                table: "Property<string>",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UpdatedByUser",
                schema: "public",
                table: "Property<string>",
                type: "character varying(600)",
                maxLength: 600,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CreatedByUser",
                schema: "public",
                table: "Property<decimal>",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UpdatedByUser",
                schema: "public",
                table: "Property<decimal>",
                type: "character varying(600)",
                maxLength: 600,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CreatedByUser",
                schema: "public",
                table: "Property<bool>",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UpdatedByUser",
                schema: "public",
                table: "Property<bool>",
                type: "character varying(600)",
                maxLength: 600,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CreatedByUser",
                schema: "public",
                table: "Property<DateTime>",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UpdatedByUser",
                schema: "public",
                table: "Property<DateTime>",
                type: "character varying(600)",
                maxLength: 600,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CreatedByUser",
                schema: "public",
                table: "ProductType",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UpdatedByUser",
                schema: "public",
                table: "ProductType",
                type: "character varying(600)",
                maxLength: 600,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CreatedByUser",
                schema: "public",
                table: "ProductBrand",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UpdatedByUser",
                schema: "public",
                table: "ProductBrand",
                type: "character varying(600)",
                maxLength: 600,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                schema: "public",
                table: "Product",
                type: "character varying(2000)",
                maxLength: 2000,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(5000)",
                oldMaxLength: 5000,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedByUser",
                schema: "public",
                table: "Product",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UpdatedByUser",
                schema: "public",
                table: "Product",
                type: "character varying(600)",
                maxLength: 600,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "Notes",
                schema: "public",
                table: "Order",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(200)",
                oldMaxLength: 200,
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "DeliveryAddressId",
                schema: "public",
                table: "Order",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<string>(
                name: "CreatedByUser",
                schema: "public",
                table: "Image",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "IsTitle",
                schema: "public",
                table: "Image",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "UpdatedByUser",
                schema: "public",
                table: "Image",
                type: "character varying(600)",
                maxLength: 600,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CreatedByUser",
                schema: "public",
                table: "Category",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UpdatedByUser",
                schema: "public",
                table: "Category",
                type: "character varying(600)",
                maxLength: 600,
                nullable: false,
                defaultValue: "");
        }
    }
}
