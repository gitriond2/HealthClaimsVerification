// HealthClaimsVerification/Data/HealthClaimsContext.cs
using Microsoft.EntityFrameworkCore;
using HealthClaimsVerification.Models;

namespace HealthClaimsVerification.Data
{
    public class HealthClaimsContext : DbContext
    {
        public HealthClaimsContext(DbContextOptions<HealthClaimsContext> options)
            : base(options)
        {
        }

        public DbSet<HealthClaim> HealthClaims { get; set; }
        public DbSet<Influencer> Influencers { get; set; }
    }
}

