import express from 'express';
import { researchRateLimiter } from '../middleware/rateLimiter';

const router = express.Router();

// In-memory storage for demo (in production, use Railway PostgreSQL)
const researchSessions = new Map();
let sessionCounter = 1;

// Mock research data
const mockResults = {
  "quantum computing": {
    summary: "Quantum computing is advancing rapidly with IBM, Google, and other companies making significant breakthroughs in 2024.",
    sources: [
      { title: "Quantum Supremacy Achieved", url: "https://arxiv.org/example1", type: "academic" },
      { title: "IBM's Latest Quantum Processor", url: "https://news.example.com/ibm", type: "news" }
    ],
    insights: ["Quantum error correction improving", "Commercial applications emerging"]
  },
  "ai safety": {
    summary: "AI safety research focuses on alignment, interpretability, and robust governance frameworks.",
    sources: [
      { title: "Constitutional AI Methods", url: "https://arxiv.org/example2", type: "academic" },
      { title: "OpenAI Safety Update", url: "https://openai.com/safety", type: "news" }
    ],
    insights: ["Constitutional AI showing promise", "Industry alignment on safety standards"]
  }
};

// Health check for research service
router.get('/health', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'Research service is running on Railway',
      timestamp: new Date().toISOString(),
      platform: 'railway',
      sessions: researchSessions.size
    },
  });
});

// Create research session endpoint
router.post('/', researchRateLimiter, async (req, res) => {
  try {
    const { query, options = {} } = req.body;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        error: { message: 'Query is required' }
      });
    }

    const sessionId = `session_${sessionCounter++}`;
    const session = {
      id: sessionId,
      query,
      options,
      status: 'running',
      createdAt: new Date().toISOString(),
      progress: 0
    };

    researchSessions.set(sessionId, session);

    // Simulate research process
    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      let results = null;
      
      for (const [key, data] of Object.entries(mockResults)) {
        if (lowerQuery.includes(key)) {
          results = data;
          break;
        }
      }
      
      if (!results) {
        results = {
          summary: `Research on "${query}" is an emerging field with various perspectives and ongoing developments.`,
          sources: [
            { title: "General Research Overview", url: "https://example.com/research", type: "academic" },
            { title: "Industry Insights", url: "https://example.com/industry", type: "news" }
          ],
          insights: ["This is an active area of research", "Multiple approaches are being explored"]
        };
      }
      
      const updatedSession = {
        ...session,
        status: 'completed',
        progress: 100,
        results,
        completedAt: new Date().toISOString()
      };
      
      researchSessions.set(sessionId, updatedSession);
    }, 3000);

    res.json({
      success: true,
      data: {
        sessionId,
        status: 'started',
        message: 'Research session initiated. Use the sessionId to check progress.'
      }
    });
  } catch (error) {
    console.error('Research error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Internal server error during research initiation' }
    });
  }
});

// Get research sessions endpoint
router.get('/', (req, res) => {
  const sessions = Array.from(researchSessions.values());
  res.json({
    success: true,
    data: {
      sessions,
      total: sessions.length
    }
  });
});

// Get specific research session
router.get('/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const session = researchSessions.get(sessionId);
  
  if (!session) {
    return res.status(404).json({
      success: false,
      error: { message: 'Research session not found' }
    });
  }
  
  res.json({
    success: true,
    data: session
  });
});

export default router;
