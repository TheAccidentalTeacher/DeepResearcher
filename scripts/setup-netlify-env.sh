#!/bin/bash

# 🌐 NETLIFY - Mass Environment Variable Upload
echo "🌐 Setting up Netlify environment variables..."

# Using Netlify CLI to set environment variables
# Note: Netlify primarily hosts static sites, so these are for build-time usage

# Core APIs  
netlify env:set OPENAI_API_KEY your_openai_key_here
netlify env:set UNSPLASH_ACCESS_KEY your_unsplash_key_here
netlify env:set PEXELS_API_KEY your_pexels_key_here
netlify env:set REPLICATE_API_TOKEN your_replicate_token_here
netlify env:set NEXTAUTH_SECRET your_nextauth_secret_here
netlify env:set NEXTAUTH_URL https://your-app.netlify.app

# Free Research APIs
netlify env:set ARXIV_API_URL http://export.arxiv.org/api/query
netlify env:set WIKIPEDIA_API_URL https://en.wikipedia.org/api/rest_v1
netlify env:set CROSSREF_API_URL https://api.crossref.org

# Optional APIs (uncomment when you have them)
# netlify env:set NEWS_API_KEY your_news_api_key_here
# netlify env:set SEMANTIC_SCHOLAR_API_KEY your_semantic_scholar_key_here
# netlify env:set WOLFRAM_ALPHA_API_KEY your_wolfram_alpha_key_here

echo "✅ Netlify environment variables configured!"
echo "💡 Visit https://app.netlify.com to verify in your site settings"
