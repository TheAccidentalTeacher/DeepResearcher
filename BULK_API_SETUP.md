# 🚀 Bulk API Management Guide

No more adding APIs one by one! Here's how to mass upload your environment variables to all major hosting platforms.

## 📦 What You Need

1. **Install Platform CLIs:**
```bash
# Vercel CLI
npm install -g vercel

# Railway CLI  
curl -fsSL https://railway.app/install.sh | sh

# Netlify CLI
npm install -g netlify-cli
```

2. **Login to Platforms:**
```bash
vercel login
railway login
netlify login
```

## 🎯 Quick Setup Scripts

I've created automated scripts for each platform:

### Option 1: Vercel (Recommended for Next.js)
```bash
chmod +x scripts/setup-vercel-env.sh
./scripts/setup-vercel-env.sh
```

### Option 2: Railway (Full-stack with database)
```bash
chmod +x scripts/setup-railway-env.sh
./scripts/setup-railway-env.sh
```

### Option 3: Netlify (Static deployment)
```bash
chmod +x scripts/setup-netlify-env.sh
./scripts/setup-netlify-env.sh
```

## 🔑 Your API Keys Ready to Upload

From the `.env.all` file, here are your configured APIs:

### ✅ Core APIs (You Have These)
- **OpenAI API**: `sk-...` (GPT-4 research)
- **Unsplash**: Access key for research images
- **Pexels**: API key for additional imagery  
- **Replicate**: Token for advanced AI models

### 🆓 Free Research APIs (Auto-configured)
- **arXiv**: Academic papers (no key needed)
- **Wikipedia**: Research content (no key needed)
- **CrossRef**: Academic citations (no key needed)

### 🔄 Optional APIs (Get when needed)
- **News API**: Current events research
- **Semantic Scholar**: Academic search
- **Wolfram Alpha**: Computational research

## 🚀 Deployment Commands

After setting up environment variables:

### Vercel (Instant deployment)
```bash
vercel --prod
```

### Railway (Full backend support)
```bash
railway up
```

### Netlify (Static hosting)
```bash
netlify deploy --prod
```

## 💡 Pro Tips

1. **Start with Vercel** - Best for Next.js apps
2. **Test locally first** - Use the demo at localhost:8000
3. **One platform at a time** - Don't overwhelm yourself
4. **Free tier limits** - Monitor API usage on free plans

## 🔧 Troubleshooting

**Scripts not executable?**
```bash
chmod +x scripts/*.sh
```

**CLI not found?**
```bash
npm install -g vercel railway netlify-cli
```

**Wrong values?** Edit the scripts and replace `your_api_key_here` with your actual keys.

---

**Ready to deploy?** Pick one platform and run its script! 🎉
