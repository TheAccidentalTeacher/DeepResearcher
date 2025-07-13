#!/bin/bash

# 🚂 RAILWAY - Mass Environment Variable Upload  
echo "🚂 Setting up Railway environment variables..."

# Core APIs
railway variables set OPENAI_API_KEY=your_openai_key_here
railway variables set UNSPLASH_ACCESS_KEY=your_unsplash_key_here
railway variables set PEXELS_API_KEY=your_pexels_key_here
railway variables set REPLICATE_API_TOKEN=your_replicate_token_here
railway variables set NEXTAUTH_SECRET=your_nextauth_secret_here
railway variables set NEXTAUTH_URL=https://your-app.railway.app

# Free Research APIs
railway variables set ARXIV_API_URL=http://export.arxiv.org/api/query
railway variables set WIKIPEDIA_API_URL=https://en.wikipedia.org/api/rest_v1
railway variables set CROSSREF_API_URL=https://api.crossref.org

# Optional APIs (uncomment when you have them)
# railway variables set NEWS_API_KEY=your_news_api_key_here
# railway variables set SEMANTIC_SCHOLAR_API_KEY=your_semantic_scholar_key_here
# railway variables set WOLFRAM_ALPHA_API_KEY=your_wolfram_alpha_key_here

echo "✅ Railway environment variables configured!"
echo "💡 Visit https://railway.app/dashboard to verify values"
