export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query } = req.body;

    // Validate query
    if (!query || query.trim().length === 0) {
      return res.status(400).json({ error: 'Query is required' });
    }

    // Get API key from environment variable (secure on server)
    const apiKey = process.env.TAVILY_API_KEY;

    if (!apiKey) {
      console.error('TAVILY_API_KEY not found in environment variables');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Call Tavily API
    const response = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: apiKey,
        query: query,
        search_depth: "advanced",
        include_images: true,
        include_answer: true,
        max_results: 5
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Tavily API error:', response.status, errorText);
      return res.status(response.status).json({ 
        error: 'Search service unavailable',
        details: errorText 
      });
    }

    const data = await response.json();

    // Return successful response
    return res.status(200).json({
      results: data.results || [],
      images: data.images || [],
      answer: data.answer || ""
    });

  } catch (error) {
    console.error('Serverless function error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}