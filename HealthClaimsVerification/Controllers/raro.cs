/* [HttpGet("{id}")]
public async Task<ActionResult<Influencer>> GetInfluencer(int id)
{
    try
    {
        var influencer = await _context.Influencers.Include(i => i.HealthClaims).FirstOrDefaultAsync(i => i.Id == id);

        if (influencer == null)
        {
            return NotFound();
        }

        return influencer;
    }
    catch (Exception ex)
    {
        // Log the exception (using a logging framework like Serilog, NLog, etc.)
        return StatusCode(500, "Internal server error: " + ex.Message);
    }
}
 */
/*  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Fetching influencer content for:", influencerName); // Verificar nombre del influenciador
  const influencerContent = await fetchInfluencerContent(influencerName);
  console.log("Influencer content:", influencerContent); // Verificar contenido obtenido

  if (influencerContent) {
    setSearchResults(influencerContent.influencers || []);
    const verifiedClaims = await verifyClaims(influencerContent.claims || []);
    console.log("Verified claims:", verifiedClaims); // Verificar afirmaciones verificadas

    if (verifiedClaims) {
      onSubmit({
        timeRange,
        influencerName,
        claimsToAnalyze,
        productsToFind,
        includeRevenueAnalysis,
        verifyWithJournals,
        influencerContent,
        verifiedClaims
      });

      await backendApi.post('/route', { data: verifiedClaims });
    }
  }
}; */
