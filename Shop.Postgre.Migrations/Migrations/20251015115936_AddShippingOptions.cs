using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Shop.Postgre.Migrations.Migrations
{
    /// <inheritdoc />
    public partial class AddShippingOptions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ShippingOptionId",
                schema: "public",
                table: "Order",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ShippingOption",
                schema: "public",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Cost = table.Column<decimal>(type: "numeric", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShippingOption", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Order_ShippingOptionId",
                schema: "public",
                table: "Order",
                column: "ShippingOptionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Order_ShippingOption_ShippingOptionId",
                schema: "public",
                table: "Order",
                column: "ShippingOptionId",
                principalSchema: "public",
                principalTable: "ShippingOption",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_ShippingOption_ShippingOptionId",
                schema: "public",
                table: "Order");

            migrationBuilder.DropTable(
                name: "ShippingOption",
                schema: "public");

            migrationBuilder.DropIndex(
                name: "IX_Order_ShippingOptionId",
                schema: "public",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "ShippingOptionId",
                schema: "public",
                table: "Order");
        }
    }
}
