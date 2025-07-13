const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for demo
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

// Routes
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Deep Research Assistant API is running',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/research', (req, res) => {
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

  // Simulate processing
  setTimeout(() => {
    const keywords = query.toLowerCase();
    let results = null;
    
    for (const [topic, data] of Object.entries(mockResults)) {
      if (keywords.includes(topic)) {
        results = data;
        break;
      }
    }
    
    if (!results) {
      results = {
        summary: `Research completed for: "${query}". This is a mock response demonstrating the system's capability.`,
        sources: [
          { title: "Relevant Academic Paper", url: "https://arxiv.org/mock", type: "academic" },
          { title: "Industry News Article", url: "https://news.mock.com", type: "news" }
        ],
        insights: ["Key finding 1", "Important trend 2", "Notable development 3"]
      };
    }

    session.status = 'completed';
    session.progress = 100;
    session.results = results;
    session.completedAt = new Date().toISOString();
  }, 2000);

  res.json({
    success: true,
    data: {
      sessionId,
      status: 'running',
      message: 'Research session started'
    }
  });
});

app.get('/api/research/:sessionId', (req, res) => {
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

app.get('/api/research/:sessionId/status', (req, res) => {
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
    data: {
      sessionId,
      status: session.status,
      progress: session.progress
    }
  });
});

app.get('/api/research', (req, res) => {
  const sessions = Array.from(researchSessions.values()).map(session => ({
    id: session.id,
    query: session.query,
    status: session.status,
    createdAt: session.createdAt,
    completedAt: session.completedAt
  }));

  res.json({
    success: true,
    data: sessions
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: { message: 'Endpoint not found' }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Deep Research Assistant API running on http://localhost:${PORT}`);
  console.log(`📖 Health check: http://localhost:${PORT}/health`);
  console.log(`🔬 Try: POST http://localhost:${PORT}/api/research with {"query": "quantum computing"}`);
});
