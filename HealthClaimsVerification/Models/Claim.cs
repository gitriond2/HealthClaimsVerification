// Models/Claim.cs
namespace HealthClaimsVerification.Models
{
    public class Claim
    {
        public int Id { get; set; }
        public string ClaimText { get; set; }
        public string Category { get; set; }
        public string VerificationStatus { get; set; }
        public int TrustScore { get; set; } // Asegúrate de que esta propiedad esté presente
        public Influencer Influencer { get; set; }

        public Claim()
        {
            ClaimText = string.Empty;
            Category = string.Empty;
            VerificationStatus = string.Empty;
        }
    }
}
