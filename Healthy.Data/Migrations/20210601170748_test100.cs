using Microsoft.EntityFrameworkCore.Migrations;

namespace Healthy.Data.Migrations
{
    public partial class test100 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_PacientDoctor",
                table: "PacientDoctor");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PacientDoctor",
                table: "PacientDoctor",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_PacientDoctor_PacientId",
                table: "PacientDoctor",
                column: "PacientId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_PacientDoctor",
                table: "PacientDoctor");

            migrationBuilder.DropIndex(
                name: "IX_PacientDoctor_PacientId",
                table: "PacientDoctor");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PacientDoctor",
                table: "PacientDoctor",
                columns: new[] { "PacientId", "DoctorId" });
        }
    }
}
