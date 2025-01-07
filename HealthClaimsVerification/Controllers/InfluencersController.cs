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
    public class InfluencersController : ControllerBase
    {
        private readonly DataContext _context;

        public InfluencersController(DataContext context)
        {
            _context = context;
        }

        // GET: api/influencers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Influencer>>> GetInfluencers()
        {
            var influencers = await _context.Influencers
                                            .Include(i => i.HealthClaims)
                                            .ToListAsync();

            return influencers;
        }

        // GET: api/influencers/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Influencer>> GetInfluencer(int id)
        {
            var influencer = await _context.Influencers
                                           .Include(i => i.HealthClaims)
                                           .FirstOrDefaultAsync(i => i.Id == id);

            if (influencer == null)
            {
                return NotFound();
            }

            return influencer;
        }

        // POST: api/influencers
        [HttpPost]
        public async Task<ActionResult<Influencer>> PostInfluencer(Influencer influencer)
        {
            _context.Influencers.Add(influencer);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetInfluencer), new { id = influencer.Id }, influencer);
        }

        // PUT: api/influencers/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInfluencer(int id, Influencer influencer)
        {
            if (id != influencer.Id)
            {
                return BadRequest();
            }

            _context.Entry(influencer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Influencers.Any(e => e.Id == id))
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

        // DELETE: api/influencers/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInfluencer(int id)
        {
            var influencer = await _context.Influencers.FindAsync(id);
            if (influencer == null)
            {
                return NotFound();
            }

            _context.Influencers.Remove(influencer);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
