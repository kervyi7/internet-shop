using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Shop.Postgre.Migrations.Migrations
{
    /// <inheritdoc />
    public partial class AddProduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsTitle",
                schema: "public",
                table: "Image",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "ProductBrand",
                schema: "public",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedByUser = table.Column<string>(type: "text", nullable: false),
                    UpdatedByUser = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Code = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductBrand", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProductType",
                schema: "public",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedByUser = table.Column<string>(type: "text", nullable: false),
                    UpdatedByUser = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Code = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Product",
                schema: "public",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TypeId = table.Column<int>(type: "integer", nullable: false),
                    BrandId = table.Column<int>(type: "integer", nullable: false),
                    Price = table.Column<decimal>(type: "numeric", nullable: false),
                    Currency = table.Column<string>(type: "text", nullable: true),
                    IsExist = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedByUser = table.Column<string>(type: "text", nullable: false),
                    UpdatedByUser = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Code = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Product", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Product_ProductBrand_BrandId",
                        column: x => x.BrandId,
                        principalSchema: "public",
                        principalTable: "ProductBrand",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Product_ProductType_TypeId",
                        column: x => x.TypeId,
                        principalSchema: "public",
                        principalTable: "ProductType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ImageProduct (Dictionary<string, object>)",
                schema: "public",
                columns: table => new
                {
                    ImagesId = table.Column<int>(type: "integer", nullable: false),
                    ProductsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImageProduct (Dictionary<string, object>)", x => new { x.ImagesId, x.ProductsId });
                    table.ForeignKey(
                        name: "FK_ImageProduct (Dictionary<string, object>)_Image_ImagesId",
                        column: x => x.ImagesId,
                        principalSchema: "public",
                        principalTable: "Image",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ImageProduct (Dictionary<string, object>)_Product_ProductsId",
                        column: x => x.ProductsId,
                        principalSchema: "public",
                        principalTable: "Product",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ProductImage",
                schema: "public",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ProductId = table.Column<int>(type: "integer", nullable: false),
                    ImageId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductImage", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductImage_Image_ImageId",
                        column: x => x.ImageId,
                        principalSchema: "public",
                        principalTable: "Image",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductImage_Product_ProductId",
                        column: x => x.ProductId,
                        principalSchema: "public",
                        principalTable: "Product",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Property<DateTime>",
                schema: "public",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IsPrimary = table.Column<bool>(type: "boolean", nullable: false),
                    IsTitle = table.Column<bool>(type: "boolean", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Suffix = table.Column<string>(type: "text", nullable: true),
                    Value = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ProductId = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedByUser = table.Column<string>(type: "text", nullable: false),
                    UpdatedByUser = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Code = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Property<DateTime>", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Property<DateTime>_Product_ProductId",
                        column: x => x.ProductId,
                        principalSchema: "public",
                        principalTable: "Product",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Property<bool>",
                schema: "public",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IsPrimary = table.Column<bool>(type: "boolean", nullable: false),
                    IsTitle = table.Column<bool>(type: "boolean", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Suffix = table.Column<string>(type: "text", nullable: true),
                    Value = table.Column<bool>(type: "boolean", nullable: false),
                    ProductId = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedByUser = table.Column<string>(type: "text", nullable: false),
                    UpdatedByUser = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Code = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Property<bool>", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Property<bool>_Product_ProductId",
                        column: x => x.ProductId,
                        principalSchema: "public",
                        principalTable: "Product",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Property<int>",
                schema: "public",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IsPrimary = table.Column<bool>(type: "boolean", nullable: false),
                    IsTitle = table.Column<bool>(type: "boolean", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Suffix = table.Column<string>(type: "text", nullable: true),
                    Value = table.Column<int>(type: "integer", nullable: false),
                    ProductId = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedByUser = table.Column<string>(type: "text", nullable: false),
                    UpdatedByUser = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Code = table.Column<string>(type: "text", nullable: false)
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

            migrationBuilder.CreateTable(
                name: "Property<string>",
                schema: "public",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IsPrimary = table.Column<bool>(type: "boolean", nullable: false),
                    IsTitle = table.Column<bool>(type: "boolean", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Suffix = table.Column<string>(type: "text", nullable: true),
                    Value = table.Column<string>(type: "text", nullable: true),
                    ProductId = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedByUser = table.Column<string>(type: "text", nullable: false),
                    UpdatedByUser = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Code = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Property<string>", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Property<string>_Product_ProductId",
                        column: x => x.ProductId,
                        principalSchema: "public",
                        principalTable: "Product",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ImageProduct (Dictionary<string, object>)_ProductsId",
                schema: "public",
                table: "ImageProduct (Dictionary<string, object>)",
                column: "ProductsId");

            migrationBuilder.CreateIndex(
                name: "IX_Product_BrandId",
                schema: "public",
                table: "Product",
                column: "BrandId");

            migrationBuilder.CreateIndex(
                name: "IX_Product_Code",
                schema: "public",
                table: "Product",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Product_Name",
                schema: "public",
                table: "Product",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Product_TypeId",
                schema: "public",
                table: "Product",
                column: "TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductBrand_Code",
                schema: "public",
                table: "ProductBrand",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProductBrand_Name",
                schema: "public",
                table: "ProductBrand",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProductImage_ImageId",
                schema: "public",
                table: "ProductImage",
                column: "ImageId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductImage_ProductId_ImageId",
                schema: "public",
                table: "ProductImage",
                columns: new[] { "ProductId", "ImageId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProductType_Code",
                schema: "public",
                table: "ProductType",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProductType_Name",
                schema: "public",
                table: "ProductType",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Property<DateTime>_Code",
                schema: "public",
                table: "Property<DateTime>",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Property<DateTime>_Name",
                schema: "public",
                table: "Property<DateTime>",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Property<DateTime>_ProductId",
                schema: "public",
                table: "Property<DateTime>",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Property<bool>_Code",
                schema: "public",
                table: "Property<bool>",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Property<bool>_Name",
                schema: "public",
                table: "Property<bool>",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Property<bool>_ProductId",
                schema: "public",
                table: "Property<bool>",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Property<int>_Code",
                schema: "public",
                table: "Property<int>",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Property<int>_Name",
                schema: "public",
                table: "Property<int>",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Property<int>_ProductId",
                schema: "public",
                table: "Property<int>",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Property<string>_Code",
                schema: "public",
                table: "Property<string>",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Property<string>_Name",
                schema: "public",
                table: "Property<string>",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Property<string>_ProductId",
                schema: "public",
                table: "Property<string>",
                column: "ProductId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ImageProduct (Dictionary<string, object>)",
                schema: "public");

            migrationBuilder.DropTable(
                name: "ProductImage",
                schema: "public");

            migrationBuilder.DropTable(
                name: "Property<DateTime>",
                schema: "public");

            migrationBuilder.DropTable(
                name: "Property<bool>",
                schema: "public");

            migrationBuilder.DropTable(
                name: "Property<int>",
                schema: "public");

            migrationBuilder.DropTable(
                name: "Property<string>",
                schema: "public");

            migrationBuilder.DropTable(
                name: "Product",
                schema: "public");

            migrationBuilder.DropTable(
                name: "ProductBrand",
                schema: "public");

            migrationBuilder.DropTable(
                name: "ProductType",
                schema: "public");

            migrationBuilder.DropColumn(
                name: "IsTitle",
                schema: "public",
                table: "Image");
        }
    }
}
