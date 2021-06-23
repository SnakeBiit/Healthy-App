using Microsoft.EntityFrameworkCore.Migrations;

namespace Healthy.Data.Migrations
{
    public partial class finish : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Lenght",
                table: "Drug");

            migrationBuilder.AddColumn<int>(
                name: "Length",
                table: "Drug",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Length",
                table: "Drug");

            migrationBuilder.AddColumn<int>(
                name: "Lenght",
                table: "Drug",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
