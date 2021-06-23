using Microsoft.EntityFrameworkCore.Migrations;

namespace Healthy.Data.Migrations
{
    public partial class pleasee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_PacientDoctor_PrescriptionId",
                table: "PacientDoctor");

            migrationBuilder.AlterColumn<int>(
                name: "PrescriptionId",
                table: "PacientDoctor",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PacientDoctor_PrescriptionId",
                table: "PacientDoctor",
                column: "PrescriptionId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_PacientDoctor_PrescriptionId",
                table: "PacientDoctor");

            migrationBuilder.AlterColumn<int>(
                name: "PrescriptionId",
                table: "PacientDoctor",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.CreateIndex(
                name: "IX_PacientDoctor_PrescriptionId",
                table: "PacientDoctor",
                column: "PrescriptionId",
                unique: true,
                filter: "[PrescriptionId] IS NOT NULL");
        }
    }
}
