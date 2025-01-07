// Controllers/ClaimsController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HealthClaimsVerification.Data;
using HealthClaimsVerification.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataContext = HealthClaimsVerification.Data.HealthClaimsContext;

namespace HealthClaimsVerification.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClaimsController : ControllerBase
    {
        private readonly DataContext _context;

        public ClaimsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/claims
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HealthClaim>>> GetHealthClaims()
        {
            var healthClaims = await _context.HealthClaims.ToListAsync();
            return healthClaims;
        }

        // GET: api/claims/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<HealthClaim>> GetHealthClaim(int id)
        {
            var healthClaim = await _context.HealthClaims.FindAsync(id);

            if (healthClaim == null)
            {
                return NotFound();
            }

            return healthClaim;
        }

        // POST: api/claims
        [HttpPost]
        public async Task<ActionResult<HealthClaim>> PostHealthClaim(HealthClaim healthClaim)
        {
            _context.HealthClaims.Add(healthClaim);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetHealthClaim), new { id = healthClaim.Id }, healthClaim);
        }

        // PUT: api/claims/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHealthClaim(int id, HealthClaim healthClaim)
        {
            if (id != healthClaim.Id)
            {
                return BadRequest();
            }

            _context.Entry(healthClaim).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.HealthClaims.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/claims/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHealthClaim(int id)
        {
            var healthClaim = await _context.HealthClaims.FindAsync(id);
            if (healthClaim == null)
            {
                return NotFound();
            }

            _context.HealthClaims.Remove(healthClaim);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

