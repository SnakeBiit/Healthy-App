using Microsoft.EntityFrameworkCore.Migrations;

namespace Healthy.Data.Migrations
{
    public partial class ultima : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Prescription_PacientDoctorId",
                table: "Prescription");

            migrationBuilder.AlterColumn<int>(
                name: "PacientDoctorId",
                table: "Prescription",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Prescription_PacientDoctorId",
                table: "Prescription",
                column: "PacientDoctorId",
                unique: true,
                filter: "[PacientDoctorId] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Prescription_PacientDoctorId",
                table: "Prescription");

            migrationBuilder.AlterColumn<int>(
                name: "PacientDoctorId",
                table: "Prescription",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Prescription_PacientDoctorId",
                table: "Prescription",
                column: "PacientDoctorId",
                unique: true);
        }
    }
}
