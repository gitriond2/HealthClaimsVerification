namespace HealthClaimsVerification.Models
{
    public class HealthClaim
    {
        public int Id { get; set; }
        public string ClaimText { get; set; }
        public string Category { get; set; }
        public string VerificationStatus { get; set; }
        public int TrustScore { get; set; }
        public Influencer Influencer { get; set; }

        public HealthClaim()
        {
            ClaimText = string.Empty;
            Category = string.Empty;
            VerificationStatus = string.Empty;
        }
    }
}

