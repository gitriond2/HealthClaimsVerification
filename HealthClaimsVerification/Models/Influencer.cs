// HealthClaimsVerification/Models/Influencer.cs
using System.Collections.Generic; // Asegúrate de tener esta línea

namespace HealthClaimsVerification.Models
{
    public class Influencer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<HealthClaim> HealthClaims { get; set; }

        public Influencer()
        {
            Name = string.Empty;
            HealthClaims = new List<HealthClaim>();
        }
    }
}
