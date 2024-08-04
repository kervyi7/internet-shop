using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Shop.Postgre.Migrations.Migrations
{
    /// <inheritdoc />
    public partial class FixProperties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Property<int>",
                schema: "public");

            migrationBuilder.AddColumn<int>(
                name: "PropertyTemplateId",
                schema: "public",
                table: "Property<string>",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PropertyTemplateId",
                schema: "public",
                table: "Property<bool>",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PropertyTemplateId",
                schema: "public",
                table: "Property<DateTime>",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<decimal>(
                name: "SalePrice",
                schema: "public",
                table: "Product",
                type: "numeric",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "numeric");

            migrationBuilder.AddColumn<int>(
                name: "PropertyTemplateId",
                schema: "public",
                table: "Category",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "PropertyTemplate",
                schema: "public",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedByUser = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    UpdatedByUser = table.Column<string>(type: "character varying(600)", maxLength: 600, nullable: false),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Code = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PropertyTemplate", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Property<decimal>",
                schema: "public",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Value = table.Column<decimal>(type: "numeric", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedByUser = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    UpdatedByUser = table.Column<string>(type: "character varying(600)", maxLength: 600, nullable: false),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Code = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    IsPrimary = table.Column<bool>(type: "boolean", nullable: false),
                    IsTitle = table.Column<bool>(type: "boolean", nullable: false),
                    Description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    Suffix = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    ProductId = table.Column<int>(type: "integer", nullable: false),
                    PropertyTemplateId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Property<decimal>", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Property<decimal>_Product_ProductId",
                        column: x => x.ProductId,
                        principalSchema: "public",
                        principalTable: "Product",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Property<decimal>_PropertyTemplate_PropertyTemplateId",
                        column: x => x.PropertyTemplateId,
                        principalSchema: "public",
                        principalTable: "PropertyTemplate",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PropertyGroup",
                schema: "public",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PropertyTemplateId = table.Column<int>(type: "integer", nullable: false),
                    PropertyCode = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedByUser = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    UpdatedByUser = table.Column<string>(type: "character varying(600)", maxLength: 600, nullable: false),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Code = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false)
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
                name: "IX_Property<string>_PropertyTemplateId",
                schema: "public",
                table: "Property<string>",
                column: "PropertyTemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_Property<bool>_PropertyTemplateId",
                schema: "public",
                table: "Property<bool>",
                column: "PropertyTemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_Property<DateTime>_PropertyTemplateId",
                schema: "public",
                table: "Property<DateTime>",
                column: "PropertyTemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_Category_PropertyTemplateId",
                schema: "public",
                table: "Category",
                column: "PropertyTemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_Property<decimal>_Code_ProductId",
                schema: "public",
                table: "Property<decimal>",
                columns: new[] { "Code", "ProductId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Property<decimal>_Name_ProductId",
                schema: "public",
                table: "Property<decimal>",
                columns: new[] { "Name", "ProductId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Property<decimal>_ProductId",
                schema: "public",
                table: "Property<decimal>",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Property<decimal>_PropertyTemplateId",
                schema: "public",
                table: "Property<decimal>",
                column: "PropertyTemplateId");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Property<DateTime>_PropertyTemplate_PropertyTemplateId",
                schema: "public",
                table: "Property<DateTime>",
                column: "PropertyTemplateId",
                principalSchema: "public",
                principalTable: "PropertyTemplate",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Property<bool>_PropertyTemplate_PropertyTemplateId",
                schema: "public",
                table: "Property<bool>",
                column: "PropertyTemplateId",
                principalSchema: "public",
                principalTable: "PropertyTemplate",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Property<string>_PropertyTemplate_PropertyTemplateId",
                schema: "public",
                table: "Property<string>",
                column: "PropertyTemplateId",
                principalSchema: "public",
                principalTable: "PropertyTemplate",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Category_PropertyTemplate_PropertyTemplateId",
                schema: "public",
                table: "Category");

            migrationBuilder.DropForeignKey(
                name: "FK_Property<DateTime>_PropertyTemplate_PropertyTemplateId",
                schema: "public",
                table: "Property<DateTime>");

            migrationBuilder.DropForeignKey(
                name: "FK_Property<bool>_PropertyTemplate_PropertyTemplateId",
                schema: "public",
                table: "Property<bool>");

            migrationBuilder.DropForeignKey(
                name: "FK_Property<string>_PropertyTemplate_PropertyTemplateId",
                schema: "public",
                table: "Property<string>");

            migrationBuilder.DropTable(
                name: "Property<decimal>",
                schema: "public");

            migrationBuilder.DropTable(
                name: "PropertyGroup",
                schema: "public");

            migrationBuilder.DropTable(
                name: "PropertyTemplate",
                schema: "public");

            migrationBuilder.DropIndex(
                name: "IX_Property<string>_PropertyTemplateId",
                schema: "public",
                table: "Property<string>");

            migrationBuilder.DropIndex(
                name: "IX_Property<bool>_PropertyTemplateId",
                schema: "public",
                table: "Property<bool>");

            migrationBuilder.DropIndex(
                name: "IX_Property<DateTime>_PropertyTemplateId",
                schema: "public",
                table: "Property<DateTime>");

            migrationBuilder.DropIndex(
                name: "IX_Category_PropertyTemplateId",
                schema: "public",
                table: "Category");

            migrationBuilder.DropColumn(
                name: "PropertyTemplateId",
                schema: "public",
                table: "Property<string>");

            migrationBuilder.DropColumn(
                name: "PropertyTemplateId",
                schema: "public",
                table: "Property<bool>");

            migrationBuilder.DropColumn(
                name: "PropertyTemplateId",
                schema: "public",
                table: "Property<DateTime>");

            migrationBuilder.DropColumn(
                name: "PropertyTemplateId",
                schema: "public",
                table: "Category");

            migrationBuilder.AlterColumn<decimal>(
                name: "SalePrice",
                schema: "public",
                table: "Product",
                type: "numeric",
                nullable: false,
                defaultValue: 0m,
                oldClrType: typeof(decimal),
                oldType: "numeric",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "Property<int>",
                schema: "public",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ProductId = table.Column<int>(type: "integer", nullable: false),
                    Code = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedByUser = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    IsPrimary = table.Column<bool>(type: "boolean", nullable: false),
                    IsTitle = table.Column<bool>(type: "boolean", nullable: false),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Suffix = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedByUser = table.Column<string>(type: "character varying(600)", maxLength: 600, nullable: false),
                    Value = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Property<int>", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Property<int>_Product_ProductId",
                        column: x => x.ProductId,
                        principalSchema: "public",
                        principalTable: "Product",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Property<int>_Code_ProductId",
                schema: "public",
                table: "Property<int>",
                columns: new[] { "Code", "ProductId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Property<int>_Name_ProductId",
                schema: "public",
                table: "Property<int>",
                columns: new[] { "Name", "ProductId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Property<int>_ProductId",
                schema: "public",
                table: "Property<int>",
                column: "ProductId");
        }
    }
}
