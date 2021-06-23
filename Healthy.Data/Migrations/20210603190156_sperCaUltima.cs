using Microsoft.EntityFrameworkCore.Migrations;

namespace Healthy.Data.Migrations
{
    public partial class sperCaUltima : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PacientDoctor_Prescription_PrescriptionId",
                table: "PacientDoctor");

            migrationBuilder.DropIndex(
                name: "IX_PacientDoctor_PrescriptionId",
                table: "PacientDoctor");

            migrationBuilder.DropColumn(
                name: "PrescriptionId",
                table: "PacientDoctor");

            migrationBuilder.AddColumn<int>(
                name: "PacientDoctorId",
                table: "Prescription",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Prescription_PacientDoctorId",
                table: "Prescription",
                column: "PacientDoctorId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Prescription_PacientDoctor_PacientDoctorId",
                table: "Prescription",
                column: "PacientDoctorId",
                principalTable: "PacientDoctor",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Prescription_PacientDoctor_PacientDoctorId",
                table: "Prescription");

            migrationBuilder.DropIndex(
                name: "IX_Prescription_PacientDoctorId",
                table: "Prescription");

            migrationBuilder.DropColumn(
                name: "PacientDoctorId",
                table: "Prescription");

            migrationBuilder.AddColumn<int>(
                name: "PrescriptionId",
                table: "PacientDoctor",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PacientDoctor_PrescriptionId",
                table: "PacientDoctor",
                column: "PrescriptionId");

            migrationBuilder.AddForeignKey(
                name: "FK_PacientDoctor_Prescription_PrescriptionId",
                table: "PacientDoctor",
                column: "PrescriptionId",
                principalTable: "Prescription",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
