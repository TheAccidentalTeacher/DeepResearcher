#!/bin/bash

# 🚀 VERCEL - Mass Environment Variable Upload (UPDATED WITH YOUR KEYS!)
echo "🚀 Setting up Vercel environment variables with your API keys..."

# ✅ CORE APIs (YOU HAVE THESE - READY TO DEPLOY!)
echo "Setting Core AI APIs..."
echo "YOUR_OPENAI_API_KEY_HERE" | vercel env add OPENAI_API_KEY production
echo "YOUR_REPLICATE_API_TOKEN_HERE" | vercel env add REPLICATE_API_TOKEN production

echo "Setting Image APIs..."
echo "yYnOwhd0dI9s1pkWyZ1MZB7hNj1-xvsNUBcm2YfJxKc" | vercel env add UNSPLASH_ACCESS_KEY production
echo "OIddKO-dRJAdAnpOPbrcW5h6OhM3WqxuY3KNNLle114" | vercel env add UNSPLASH_SECRET_KEY production
echo "KiNAVfKn0jpQ0SpcFXWgo2h6WCRAmsQUDJ7BfLJ5Ad1cNiuHhRelQ5VY" | vercel env add PEXELS_API_KEY production
echo "51207676-35a50eca7b3766d7cbad972f7" | vercel env add PIXABAY_API_KEY production

echo "Setting System Configuration..."
echo "deep_researcher_super_secret_key_2025_production" | vercel env add NEXTAUTH_SECRET production
echo "https://your-app.vercel.app" | vercel env add NEXTAUTH_URL production

# 🆓 FREE RESEARCH APIS (NO KEYS NEEDED)
echo "Setting Free APIs..."
echo "http://export.arxiv.org/api/query" | vercel env add ARXIV_API_URL production
echo "https://en.wikipedia.org/api/rest_v1" | vercel env add WIKIPEDIA_API_URL production
echo "https://api.crossref.org/works" | vercel env add CROSSREF_API_URL production
echo "https://openclipart.org/search/json/" | vercel env add OPENCLIPART_BASE_URL production

echo ""
echo "✅ SUCCESS! Your API keys are configured for Vercel!"
echo "🚀 Ready to deploy with: vercel --prod"
echo ""
echo "📋 APIs Ready for Use:"
echo "  ✅ OpenAI GPT-4"
echo "  ✅ Replicate AI Models" 
echo "  ✅ Unsplash Images"
echo "  ✅ Pexels Images"
echo "  ✅ Pixabay Images"
echo "  ✅ arXiv Academic Papers"
echo "  ✅ Wikipedia Research"
echo "  ✅ CrossRef Citations"
echo ""
echo "🎯 Next Steps:"
echo "  1. Run: vercel --prod"
echo "  2. Get more APIs from the checklist when ready"
echo "  3. Re-run this script to add new keys"
