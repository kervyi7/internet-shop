using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Shop.Postgre.Migrations.Migrations
{
    /// <inheritdoc />
    public partial class RemoveUnusedFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AddedAt",
                schema: "public",
                table: "FavoriteProduct");

            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdatedAt",
                schema: "public",
                table: "Order",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone",
                oldNullable: true);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedByUser",
                schema: "public",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "UpdatedByUser",
                schema: "public",
                table: "Order");

            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdatedAt",
                schema: "public",
                table: "Order",
                type: "timestamp with time zone",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AddColumn<DateTime>(
                name: "AddedAt",
                schema: "public",
                table: "FavoriteProduct",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
