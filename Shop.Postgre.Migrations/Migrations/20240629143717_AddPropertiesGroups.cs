using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Shop.Postgre.Migrations.Migrations
{
    /// <inheritdoc />
    public partial class AddPropertiesGroups : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Category_PropertyTemplate_PropertyTemplateId",
                schema: "public",
                table: "Category");

            migrationBuilder.DropTable(
                name: "PropertyGroup",
                schema: "public");

            migrationBuilder.AddColumn<string>(
                name: "PropertyGroups",
                schema: "public",
                table: "PropertyTemplate",
                type: "jsonb",
                nullable: true);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Category_PropertyTemplate_PropertyTemplateId",
                schema: "public",
                table: "Category");

            migrationBuilder.DropColumn(
                name: "PropertyGroups",
                schema: "public",
                table: "PropertyTemplate");

            migrationBuilder.CreateTable(
                name: "PropertyGroup",
                schema: "public",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PropertyTemplateId = table.Column<int>(type: "integer", nullable: false),
                    Code = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedByUser = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    PropertyCode = table.Column<string>(type: "text", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedByUser = table.Column<string>(type: "character varying(600)", maxLength: 600, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PropertyGroup", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PropertyGroup_PropertyTemplate_PropertyTemplateId",
                        column: x => x.PropertyTemplateId,
                        principalSchema: "public",
                        principalTable: "PropertyTemplate",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PropertyGroup_PropertyTemplateId",
                schema: "public",
                table: "PropertyGroup",
                column: "PropertyTemplateId");

            migrationBuilder.AddForeignKey(
                name: "FK_Category_PropertyTemplate_PropertyTemplateId",
                schema: "public",
                table: "Category",
                column: "PropertyTemplateId",
                principalSchema: "public",
                principalTable: "PropertyTemplate",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
