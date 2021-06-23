using Microsoft.EntityFrameworkCore.Migrations;

namespace Healthy.Data.Migrations
{
    public partial class updateDatabasePrescription : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Assessment",
                table: "Prescription",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Diagnostic",
                table: "Prescription",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Symptom",
                table: "Prescription",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Assessment",
                table: "Prescription");

            migrationBuilder.DropColumn(
                name: "Diagnostic",
                table: "Prescription");

            migrationBuilder.DropColumn(
                name: "Symptom",
                table: "Prescription");
        }
    }
}
