// Vercel-optimized API for Deep Research Assistant
import { NextResponse } from 'next/server';

// In-memory storage for demo (in production, use Vercel KV or database)
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

export async function POST(request) {
  try {
    const { query, options = {} } = await request.json();
    
    if (!query) {
      return NextResponse.json({
        success: false,
        error: { message: 'Query is required' }
      }, { status: 400 });
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

    // Simulate processing (in production, integrate with OpenAI)
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
          summary: `Research completed for: "${query}". This demonstrates the AI research assistant capability.`,
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

    return NextResponse.json({
      success: true,
      data: {
        sessionId,
        status: 'running',
        message: 'Research session started'
      }
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: { message: 'Internal server error' }
    }, { status: 500 });
  }
}

export async function GET() {
  const sessions = Array.from(researchSessions.values()).map(session => ({
    id: session.id,
    query: session.query,
    status: session.status,
    createdAt: session.createdAt,
    completedAt: session.completedAt
  }));

  return NextResponse.json({
    success: true,
    data: sessions
  });
}
