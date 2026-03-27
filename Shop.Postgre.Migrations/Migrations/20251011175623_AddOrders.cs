using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Shop.Postgre.Migrations.Migrations
{
    /// <inheritdoc />
    public partial class AddOrders : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Property<DateTime>_PropertyTemplate_PropertyTemplateId",
                schema: "public",
                table: "Property<DateTime>");

            migrationBuilder.DropForeignKey(
                name: "FK_Property<bool>_PropertyTemplate_PropertyTemplateId",
                schema: "public",
                table: "Property<bool>");

            migrationBuilder.DropForeignKey(
                name: "FK_Property<decimal>_PropertyTemplate_PropertyTemplateId",
                schema: "public",
                table: "Property<decimal>");

            migrationBuilder.DropForeignKey(
                name: "FK_Property<string>_PropertyTemplate_PropertyTemplateId",
                schema: "public",
                table: "Property<string>");

            migrationBuilder.DropColumn(
                name: "Properties",
                schema: "public",
                table: "IdentityUser");

            migrationBuilder.AlterColumn<string>(
                name: "RegisterType",
                schema: "public",
                table: "IdentityUser",
                type: "character varying(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(50)",
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Patronymic",
                schema: "public",
                table: "IdentityUser",
                type: "character varying(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(250)",
                oldMaxLength: 250,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                schema: "public",
                table: "IdentityUser",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(250)",
                oldMaxLength: 250);

            migrationBuilder.AlterColumn<string>(
                name: "FirstName",
                schema: "public",
                table: "IdentityUser",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(250)",
                oldMaxLength: 250);

            migrationBuilder.CreateTable(
                name: "DeliveryAddress",
                schema: "public",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    FirstName = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: false),
                    LastName = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: false),
                    Country = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: false),
                    City = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: false),
                    Street = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: false),
                    HouseNumber = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Apartment = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    Postcode = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    Phone = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: false),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    IsDefault = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeliveryAddress", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DeliveryAddress_IdentityUser_UserId",
                        column: x => x.UserId,
                        principalSchema: "public",
                        principalTable: "IdentityUser",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FavoriteProduct",
                schema: "public",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    ProductId = table.Column<int>(type: "integer", nullable: false),
                    AddedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FavoriteProduct", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FavoriteProduct_IdentityUser_UserId",
                        column: x => x.UserId,
                        principalSchema: "public",
                        principalTable: "IdentityUser",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FavoriteProduct_Product_ProductId",
                        column: x => x.ProductId,
                        principalSchema: "public",
                        principalTable: "Product",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Order",
                schema: "public",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    PaidAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ShippedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    TotalPrice = table.Column<decimal>(type: "numeric", nullable: false),
                    Currency = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    DeliveryAddressId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Order", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Order_DeliveryAddress_DeliveryAddressId",
                        column: x => x.DeliveryAddressId,
                        principalSchema: "public",
                        principalTable: "DeliveryAddress",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Order_IdentityUser_UserId",
                        column: x => x.UserId,
                        principalSchema: "public",
                        principalTable: "IdentityUser",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "OrderItem",
                schema: "public",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    OrderId = table.Column<int>(type: "integer", nullable: false),
                    ProductId = table.Column<int>(type: "integer", nullable: false),
                    Quantity = table.Column<decimal>(type: "numeric", nullable: false),
                    PriceAtPurchase = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderItem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderItem_Order_OrderId",
                        column: x => x.OrderId,
                        principalSchema: "public",
                        principalTable: "Order",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderItem_Product_ProductId",
                        column: x => x.ProductId,
                        principalSchema: "public",
                        principalTable: "Product",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryAddress_UserId",
                schema: "public",
                table: "DeliveryAddress",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_FavoriteProduct_ProductId",
                schema: "public",
                table: "FavoriteProduct",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_FavoriteProduct_UserId",
                schema: "public",
                table: "FavoriteProduct",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Order_DeliveryAddressId",
                schema: "public",
                table: "Order",
                column: "DeliveryAddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Order_UserId",
                schema: "public",
                table: "Order",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItem_OrderId",
                schema: "public",
                table: "OrderItem",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItem_ProductId",
                schema: "public",
                table: "OrderItem",
                column: "ProductId");

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
                name: "FK_Property<decimal>_PropertyTemplate_PropertyTemplateId",
                schema: "public",
                table: "Property<decimal>",
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
                name: "FK_Property<DateTime>_PropertyTemplate_PropertyTemplateId",
                schema: "public",
                table: "Property<DateTime>");

            migrationBuilder.DropForeignKey(
                name: "FK_Property<bool>_PropertyTemplate_PropertyTemplateId",
                schema: "public",
                table: "Property<bool>");

            migrationBuilder.DropForeignKey(
                name: "FK_Property<decimal>_PropertyTemplate_PropertyTemplateId",
                schema: "public",
                table: "Property<decimal>");

            migrationBuilder.DropForeignKey(
                name: "FK_Property<string>_PropertyTemplate_PropertyTemplateId",
                schema: "public",
                table: "Property<string>");

            migrationBuilder.DropTable(
                name: "FavoriteProduct",
                schema: "public");

            migrationBuilder.DropTable(
                name: "OrderItem",
                schema: "public");

            migrationBuilder.DropTable(
                name: "Order",
                schema: "public");

            migrationBuilder.DropTable(
                name: "DeliveryAddress",
                schema: "public");

            migrationBuilder.AlterColumn<string>(
                name: "RegisterType",
                schema: "public",
                table: "IdentityUser",
                type: "character varying(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Patronymic",
                schema: "public",
                table: "IdentityUser",
                type: "character varying(250)",
                maxLength: 250,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(50)",
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                schema: "public",
                table: "IdentityUser",
                type: "character varying(250)",
                maxLength: 250,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "FirstName",
                schema: "public",
                table: "IdentityUser",
                type: "character varying(250)",
                maxLength: 250,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(50)",
                oldMaxLength: 50);

            migrationBuilder.AddColumn<string>(
                name: "Properties",
                schema: "public",
                table: "IdentityUser",
                type: "jsonb",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Property<DateTime>_PropertyTemplate_PropertyTemplateId",
                schema: "public",
                table: "Property<DateTime>",
                column: "PropertyTemplateId",
                principalSchema: "public",
                principalTable: "PropertyTemplate",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Property<bool>_PropertyTemplate_PropertyTemplateId",
                schema: "public",
                table: "Property<bool>",
                column: "PropertyTemplateId",
                principalSchema: "public",
                principalTable: "PropertyTemplate",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Property<decimal>_PropertyTemplate_PropertyTemplateId",
                schema: "public",
                table: "Property<decimal>",
                column: "PropertyTemplateId",
                principalSchema: "public",
                principalTable: "PropertyTemplate",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Property<string>_PropertyTemplate_PropertyTemplateId",
                schema: "public",
                table: "Property<string>",
                column: "PropertyTemplateId",
                principalSchema: "public",
                principalTable: "PropertyTemplate",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
