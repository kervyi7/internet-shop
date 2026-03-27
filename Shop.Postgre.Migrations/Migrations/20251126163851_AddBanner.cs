using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Shop.Postgre.Migrations.Migrations
{
    /// <inheritdoc />
    public partial class AddBanner : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BannerId",
                schema: "public",
                table: "Image",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Banner",
                schema: "public",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Header = table.Column<string>(type: "text", nullable: false),
                    Text = table.Column<string>(type: "text", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Banner", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Image_BannerId",
                schema: "public",
                table: "Image",
                column: "BannerId");

            migrationBuilder.CreateIndex(
                name: "IX_Banner_Type",
                schema: "public",
                table: "Banner",
                column: "Type",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Image_Banner_BannerId",
                schema: "public",
                table: "Image",
                column: "BannerId",
                principalSchema: "public",
                principalTable: "Banner",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Image_Banner_BannerId",
                schema: "public",
                table: "Image");

            migrationBuilder.DropTable(
                name: "Banner",
                schema: "public");

            migrationBuilder.DropIndex(
                name: "IX_Image_BannerId",
                schema: "public",
                table: "Image");

            migrationBuilder.DropColumn(
                name: "BannerId",
                schema: "public",
                table: "Image");
        }
    }
}
