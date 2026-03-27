using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Shop.Postgre.Migrations.Migrations
{
    /// <inheritdoc />
    public partial class FixTemplate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Category_PropertyTemplateId",
                schema: "public",
                table: "Category");

            migrationBuilder.RenameColumn(
                name: "PropertyGroups",
                schema: "public",
                table: "PropertyTemplate",
                newName: "Extension");

            migrationBuilder.CreateIndex(
                name: "IX_Category_PropertyTemplateId",
                schema: "public",
                table: "Category",
                column: "PropertyTemplateId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Category_PropertyTemplateId",
                schema: "public",
                table: "Category");

            migrationBuilder.RenameColumn(
                name: "Extension",
                schema: "public",
                table: "PropertyTemplate",
                newName: "PropertyGroups");

            migrationBuilder.CreateIndex(
                name: "IX_Category_PropertyTemplateId",
                schema: "public",
                table: "Category",
                column: "PropertyTemplateId");
        }
    }
}
