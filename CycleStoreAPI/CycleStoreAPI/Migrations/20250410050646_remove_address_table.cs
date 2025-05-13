using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CycleStoreAPI.Migrations
{
    /// <inheritdoc />
    public partial class remove_address_table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Customers_Address_BillingAddressID",
                table: "Customers");

            migrationBuilder.DropForeignKey(
                name: "FK_Customers_Address_ShippingAddressID",
                table: "Customers");

            migrationBuilder.DropTable(
                name: "Address");

            migrationBuilder.DropIndex(
                name: "IX_Customers_BillingAddressID",
                table: "Customers");

            migrationBuilder.DropIndex(
                name: "IX_Customers_ShippingAddressID",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "BillingAddressID",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "ShippingAddressID",
                table: "Customers");

            migrationBuilder.AddColumn<string>(
                name: "BillingAddress_City",
                table: "Customers",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "BillingAddress_Country",
                table: "Customers",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "BillingAddress_PostalCode",
                table: "Customers",
                type: "character varying(10)",
                maxLength: 10,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "BillingAddress_State",
                table: "Customers",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "BillingAddress_StreetLine1",
                table: "Customers",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "BillingAddress_StreetLine2",
                table: "Customers",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ShippingAddress_City",
                table: "Customers",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ShippingAddress_Country",
                table: "Customers",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ShippingAddress_PostalCode",
                table: "Customers",
                type: "character varying(10)",
                maxLength: 10,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ShippingAddress_State",
                table: "Customers",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ShippingAddress_StreetLine1",
                table: "Customers",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ShippingAddress_StreetLine2",
                table: "Customers",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BillingAddress_City",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "BillingAddress_Country",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "BillingAddress_PostalCode",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "BillingAddress_State",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "BillingAddress_StreetLine1",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "BillingAddress_StreetLine2",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "ShippingAddress_City",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "ShippingAddress_Country",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "ShippingAddress_PostalCode",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "ShippingAddress_State",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "ShippingAddress_StreetLine1",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "ShippingAddress_StreetLine2",
                table: "Customers");

            migrationBuilder.AddColumn<Guid>(
                name: "BillingAddressID",
                table: "Customers",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "ShippingAddressID",
                table: "Customers",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "Address",
                columns: table => new
                {
                    AddressID = table.Column<Guid>(type: "uuid", nullable: false),
                    City = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Country = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    PostalCode = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    State = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    StreetLine1 = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    StreetLine2 = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Address", x => x.AddressID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Customers_BillingAddressID",
                table: "Customers",
                column: "BillingAddressID");

            migrationBuilder.CreateIndex(
                name: "IX_Customers_ShippingAddressID",
                table: "Customers",
                column: "ShippingAddressID");

            migrationBuilder.AddForeignKey(
                name: "FK_Customers_Address_BillingAddressID",
                table: "Customers",
                column: "BillingAddressID",
                principalTable: "Address",
                principalColumn: "AddressID",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Customers_Address_ShippingAddressID",
                table: "Customers",
                column: "ShippingAddressID",
                principalTable: "Address",
                principalColumn: "AddressID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
