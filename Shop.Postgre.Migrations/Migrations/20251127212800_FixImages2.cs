using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Shop.Postgre.Migrations.Migrations
{
    /// <inheritdoc />
    public partial class FixImages2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ProductImage_ProductId_IsTitle",
                schema: "public",
                table: "ProductImage");

            migrationBuilder.CreateIndex(
                name: "IX_ProductImage_ProductId_IsTitle",
                schema: "public",
                table: "ProductImage",
                columns: new[] { "ProductId", "IsTitle" },
                unique: true,
                filter: "\"IsTitle\" = TRUE");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ProductImage_ProductId_IsTitle",
                schema: "public",
                table: "ProductImage");

            migrationBuilder.CreateIndex(
                name: "IX_ProductImage_ProductId_IsTitle",
                schema: "public",
                table: "ProductImage",
                columns: new[] { "ProductId", "IsTitle" },
                unique: true);
        }
    }
}
