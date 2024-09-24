using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Domain.Migrations
{
    /// <inheritdoc />
    public partial class AddLisans : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Lisanslar",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProgramAdi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SonKullanici = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Departman = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CihazReferans = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LisansAnahtari = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IletisimNo = table.Column<int>(type: "int", nullable: false),
                    SatinAlmaTarihi = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FirmaAdi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LisansSuresi = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lisanslar", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Lisanslar");
        }
    }
}
