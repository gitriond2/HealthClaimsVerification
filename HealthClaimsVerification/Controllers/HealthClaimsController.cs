using Microsoft.EntityFrameworkCore;

namespace HealthClaimsVerification.Models
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

