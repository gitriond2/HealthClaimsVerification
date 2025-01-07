using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthClaimsVerification.Migrations
{
    public partial class AddTrustScoreToHealthClaim : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HealthClaims_Influencers_InfluencerId",
                table: "HealthClaims");

            migrationBuilder.DropColumn(
                name: "Followers",
                table: "Influencers");

            migrationBuilder.DropColumn(
                name: "ConfidenceScore",
                table: "HealthClaims");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Influencers",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "VerificationStatus",
                table: "HealthClaims",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "InfluencerId",
                table: "HealthClaims",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "ClaimText",
                table: "HealthClaims",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Category",
                table: "HealthClaims",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "TrustScore",
                table: "HealthClaims",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_HealthClaims_Influencers_InfluencerId",
                table: "HealthClaims",
                column: "InfluencerId",
                principalTable: "Influencers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HealthClaims_Influencers_InfluencerId",
                table: "HealthClaims");

            migrationBuilder.DropColumn(
                name: "TrustScore",
                table: "HealthClaims");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Influencers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Followers",
                table: "Influencers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "VerificationStatus",
                table: "HealthClaims",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "InfluencerId",
                table: "HealthClaims",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ClaimText",
                table: "HealthClaims",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Category",
                table: "HealthClaims",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<double>(
                name: "ConfidenceScore",
                table: "HealthClaims",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddForeignKey(
                name: "FK_HealthClaims_Influencers_InfluencerId",
                table: "HealthClaims",
                column: "InfluencerId",
                principalTable: "Influencers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
