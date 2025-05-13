using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CycleStoreAPI.Migrations
{
    /// <inheritdoc />
    public partial class changed_Restrict_constraint_to_Cascade : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItems_Cycles_CycleId",
                table: "OrderItems");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItems_Cycles_CycleId",
                table: "OrderItems",
                column: "CycleId",
                principalTable: "Cycles",
                principalColumn: "CycleID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItems_Cycles_CycleId",
                table: "OrderItems");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItems_Cycles_CycleId",
                table: "OrderItems",
                column: "CycleId",
                principalTable: "Cycles",
                principalColumn: "CycleID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
