/* using Microsoft.AspNetCore.Mvc;
using HealthClaimsVerification.Data;
using HealthClaimsVerification.Models;

namespace HealthClaimsVerification.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeedController : ControllerBase
    {
        private readonly HealthClaimsContext _context;

        public SeedController(HealthClaimsContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult SeedData()
        {
            if (!_context.Influencers.Any())
            {
                var influencer = new Influencer
                {
                    Name = "Health Guru",
                    Followers = 10000,
                    HealthClaims = new List<HealthClaim>
                    {
                        new HealthClaim { ClaimText = "Drink water every day", Category = "Nutrition", VerificationStatus = "Verificado", ConfidenceScore = 0.9 },
                        new HealthClaim { ClaimText = "Exercise regularly", Category = "Fitness", VerificationStatus = "Verificado", ConfidenceScore = 0.95 }
                    }
                };
                _context.Influencers.Add(influencer);
                _context.SaveChanges();
            }

            return Ok("Datos de ejemplo añadidos correctamente.");
        }
    }
} */
