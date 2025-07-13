# Deep Research Assistant

Autonomous, AI-Powered, Background-Capable Research Platform

## Overview

The Deep Research Assistant is a full-stack web application that acts as an intelligent, autonomous research assistant. It utilizes OpenAI's platform (GPT-4, retrieval, browsing, function calling) and integrates with academic and web data sources to provide structured, credible, and continuously updated research insights.

## Features

### Core Capabilities
- 🤖 **AI-Powered Research**: GPT-4 integration for intelligent query processing
- 🔍 **Multi-Source Aggregation**: Academic papers (arXiv, PubMed), news, web content
- ⚡ **Background Processing**: Long-running research tasks with real-time updates
- 📚 **Citation Management**: Automatic source tracking and bibliography generation
- 🎯 **Multi-Step Reasoning**: Complex query breakdown and synthesis
- 📊 **Structured Output**: Summaries, visualizations, and exportable reports

### User Experience
- 🖥️ **Modern Web Interface**: Responsive React/Next.js frontend
- 🔔 **Real-time Notifications**: Progress updates and completion alerts
- 📁 **Session Management**: Save, revisit, and organize research topics
- 🎨 **Interactive Results**: Expandable summaries and clickable citations
- ♿ **Accessibility**: Full keyboard navigation and screen reader support

## Architecture

```
frontend/          # Next.js React application
├── components/    # Reusable UI components
├── pages/         # Next.js pages and API routes
├── hooks/         # Custom React hooks
├── utils/         # Utility functions
└── styles/        # CSS and styling

backend/           # Node.js Express server
├── controllers/   # Route handlers
├── services/      # Business logic
├── models/        # Database models
├── middleware/    # Express middleware
├── jobs/          # Background job definitions
└── utils/         # Utility functions

shared/            # Shared types and utilities
├── types/         # TypeScript type definitions
└── constants/     # Shared constants

docs/              # Documentation
├── api/           # API documentation
├── user-guide/    # User documentation
└── architecture/  # Technical documentation

scripts/           # Build and deployment scripts
tests/             # Test suites
docker/            # Docker configurations
```

## Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui + Radix UI
- **State Management**: Zustand
- **Real-time**: Socket.io client

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Queue**: BullMQ with Redis
- **Real-time**: Socket.io
- **Authentication**: NextAuth.js

### AI & Integrations
- **OpenAI**: GPT-4, Function Calling, Retrieval
- **Academic APIs**: arXiv, PubMed, Semantic Scholar
- **News APIs**: NewsAPI, GNews
- **Citation**: CrossRef, Zotero integration

### Infrastructure
- **Deployment**: Docker + Docker Compose
- **Cache**: Redis
- **File Storage**: AWS S3 or local filesystem
- **Monitoring**: Winston logging

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis 6+
- OpenAI API key

### Installation

1. **Clone and install dependencies**
   ```bash
   npm install
   npm run setup
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys and database URLs
   ```

3. **Setup database**
   ```bash
   npm run db:setup
   npm run db:migrate
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

This starts:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Background workers: Automatic startup

## Usage Examples

### Basic Research Query
```
"What are the latest developments in quantum computing for drug discovery?"
```

### Advanced Query with Modifiers
```
"Research renewable energy trends in Europe, focusing on papers from 2023-2024, 
include policy analysis and market data"
```

### Background Research
```
"Track weekly updates on AI safety research and notify me of major breakthroughs"
```

## API Documentation

### Submit Research Query
```http
POST /api/research
Content-Type: application/json

{
  "query": "Latest developments in CRISPR gene editing",
  "options": {
    "depth": "comprehensive",
    "sources": ["academic", "news", "web"],
    "timeframe": "last_year",
    "background": true
  }
}
```

### Get Research Status
```http
GET /api/research/{id}/status
```

### Get Research Results
```http
GET /api/research/{id}/results
```

## Development

### Running Tests
```bash
npm run test          # Unit tests
npm run test:e2e      # End-to-end tests
npm run test:coverage # Coverage report
```

### Code Quality
```bash
npm run lint          # ESLint
npm run typecheck     # TypeScript
npm run format        # Prettier
```

### Database Operations
```bash
npm run db:migrate    # Run migrations
npm run db:seed       # Seed test data
npm run db:reset      # Reset database
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Roadmap

- [ ] Core research functionality
- [ ] Background task processing
- [ ] Multi-source integration
- [ ] Citation management
- [ ] Real-time collaboration
- [ ] Advanced visualizations
- [ ] Voice interface
- [ ] Mobile app

## Support

For support, email support@deepresearcher.ai or join our Discord community.
