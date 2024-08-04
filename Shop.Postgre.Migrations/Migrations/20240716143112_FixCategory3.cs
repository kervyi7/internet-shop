using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Shop.Postgre.Migrations.Migrations
{
    /// <inheritdoc />
    public partial class FixCategory3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Category_PropertyTemplate_PropertyTemplateId",
                schema: "public",
                table: "Category");

            migrationBuilder.DropIndex(
                name: "IX_Category_PropertyTemplateId",
                schema: "public",
                table: "Category");

            migrationBuilder.DropColumn(
                name: "PropertyTemplateId",
                schema: "public",
                table: "Category");

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                schema: "public",
                table: "PropertyTemplate",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_PropertyTemplate_CategoryId",
                schema: "public",
                table: "PropertyTemplate",
                column: "CategoryId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_PropertyTemplate_Category_CategoryId",
                schema: "public",
                table: "PropertyTemplate",
                column: "CategoryId",
                principalSchema: "public",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PropertyTemplate_Category_CategoryId",
                schema: "public",
                table: "PropertyTemplate");

            migrationBuilder.DropIndex(
                name: "IX_PropertyTemplate_CategoryId",
                schema: "public",
                table: "PropertyTemplate");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                schema: "public",
                table: "PropertyTemplate");

            migrationBuilder.AddColumn<int>(
                name: "PropertyTemplateId",
                schema: "public",
                table: "Category",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Category_PropertyTemplateId",
                schema: "public",
                table: "Category",
                column: "PropertyTemplateId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Category_PropertyTemplate_PropertyTemplateId",
                schema: "public",
                table: "Category",
                column: "PropertyTemplateId",
                principalSchema: "public",
                principalTable: "PropertyTemplate",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
