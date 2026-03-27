using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Shop.Postgre.Migrations.Migrations
{
    /// <inheritdoc />
    public partial class FixProperty : Migration
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

            migrationBuilder.AlterColumn<int>(
                name: "PropertyTemplateId",
                schema: "public",
                table: "Property<string>",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "PropertyTemplateId",
                schema: "public",
                table: "Property<decimal>",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "PropertyTemplateId",
                schema: "public",
                table: "Property<bool>",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "PropertyTemplateId",
                schema: "public",
                table: "Property<DateTime>",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddCheckConstraint(
                name: "ckPropertyString_ProductOrTemplate",
                schema: "public",
                table: "Property<string>",
                sql: "\"ProductId\" IS NOT NULL OR \"PropertyTemplateId\" IS NOT NULL");

            migrationBuilder.AddCheckConstraint(
                name: "ckPropertyDecimal_ProductOrTemplate",
                schema: "public",
                table: "Property<decimal>",
                sql: "\"ProductId\" IS NOT NULL OR \"PropertyTemplateId\" IS NOT NULL");

            migrationBuilder.AddCheckConstraint(
                name: "ckPropertyBool_ProductOrTemplate",
                schema: "public",
                table: "Property<bool>",
                sql: "\"ProductId\" IS NOT NULL OR \"PropertyTemplateId\" IS NOT NULL");

            migrationBuilder.AddCheckConstraint(
                name: "ckPropertyDateTime_ProductOrTemplate",
                schema: "public",
                table: "Property<DateTime>",
                sql: "\"ProductId\" IS NOT NULL OR \"PropertyTemplateId\" IS NOT NULL");

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

            migrationBuilder.DropCheckConstraint(
                name: "ckPropertyString_ProductOrTemplate",
                schema: "public",
                table: "Property<string>");

            migrationBuilder.DropCheckConstraint(
                name: "ckPropertyDecimal_ProductOrTemplate",
                schema: "public",
                table: "Property<decimal>");

            migrationBuilder.DropCheckConstraint(
                name: "ckPropertyBool_ProductOrTemplate",
                schema: "public",
                table: "Property<bool>");

            migrationBuilder.DropCheckConstraint(
                name: "ckPropertyDateTime_ProductOrTemplate",
                schema: "public",
                table: "Property<DateTime>");

            migrationBuilder.AlterColumn<int>(
                name: "PropertyTemplateId",
                schema: "public",
                table: "Property<string>",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "PropertyTemplateId",
                schema: "public",
                table: "Property<decimal>",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "PropertyTemplateId",
                schema: "public",
                table: "Property<bool>",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "PropertyTemplateId",
                schema: "public",
                table: "Property<DateTime>",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

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
    }
}
