# 🚂 Complete Railway Deployment Guide

## 🎯 Migration Complete!

Your DeepResearcher project has been successfully migrated from Vercel to Railway! The project now uses:

- ✅ **Express.js backend** (instead of Next.js API routes)
- ✅ **Railway.json** configuration
- ✅ **PostgreSQL** database support
- ✅ **Background worker** capabilities
- ✅ **Production-ready** environment

---

## 🚀 Quick Deployment (5 minutes)

### 1. **Create Railway Account & Install CLI**
```bash
# Install Railway CLI globally
npm install -g @railway/cli

# Login to Railway
railway login
```

### 2. **Deploy to Railway**
```bash
# From your project root
cd /path/to/DeepResearcher

# Initialize Railway project
railway init

# Deploy immediately
railway up
```

### 3. **Add Database**
```bash
# Add PostgreSQL database
railway add postgresql

# Railway will automatically set DATABASE_URL
```

### 4. **Set Environment Variables**
Go to your Railway dashboard and add these **essential** variables:
```
NODE_ENV=production
JWT_SECRET=<generate-a-secure-random-string>
FRONTEND_URL=https://your-frontend-domain.com
```

**🎉 Your API is now live!** 

---

## 📋 Complete Setup Checklist

### ✅ **Essential Variables (Required)**
| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `production` |
| `DATABASE_URL` | PostgreSQL URL | Auto-provided by Railway |
| `JWT_SECRET` | JWT signing key | Use a 32+ character random string |
| `FRONTEND_URL` | Your frontend domain | `https://myapp.vercel.app` |

### ⚠️ **Optional Variables (Enhanced Features)**
| Variable | Purpose | Required For |
|----------|---------|--------------|
| `OPENAI_API_KEY` | AI research features | Smart research capabilities |
| `REDIS_URL` | Caching & background jobs | Performance optimization |
| `SMTP_*` | Email notifications | User notifications |

### 🔒 **Security Checklist**
- [ ] Generated secure `JWT_SECRET` (use `openssl rand -hex 32`)
- [ ] Set proper `ALLOWED_ORIGINS` for CORS
- [ ] Added rate limiting configuration
- [ ] Configured proper logging level

---

## 🔗 **API Endpoints**

Your Railway app will expose:

| Endpoint | Purpose |
|----------|---------|
| `GET /health` | Health check |
| `GET /api/health` | API health check |
| `POST /api/research` | Start research session |
| `GET /api/research` | List all sessions |
| `GET /api/research/:id` | Get specific session |

**Test your deployment:**
```bash
# Health check
curl https://your-app.railway.app/health

# Research API
curl -X POST https://your-app.railway.app/api/research \
  -H "Content-Type: application/json" \
  -d '{"query": "quantum computing"}'
```

---

## 🛠 **Development vs Production**

### **Local Development**
```bash
# Use development settings
npm run dev:backend

# Skips database/Redis (uses SKIP_* flags)
# Runs on http://localhost:8000
```

### **Production (Railway)**
```bash
# Automatic build and deploy
railway up

# Uses PostgreSQL database
# Background workers enabled
# Full feature set
```

---

## 🎨 **Frontend Integration**

Update your frontend API calls to use the Railway backend:

```javascript
// Replace Vercel API calls
const API_BASE = 'https://your-app.railway.app'

// Instead of: /api/research
fetch(`${API_BASE}/api/research`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: 'AI research' })
})
```

---

## 🔧 **Advanced Configuration**

### **Add Redis for Performance**
```bash
# Add Redis addon
railway add redis

# Set in environment variables
REDIS_URL=<auto-provided-by-railway>
```

### **Background Workers**
Railway automatically handles background workers. No additional configuration needed!

### **Custom Domain**
1. Go to Railway dashboard
2. Settings → Domains
3. Add your custom domain
4. Update DNS records as instructed

---

## 🚨 **Troubleshooting**

### **Common Issues:**

**Build fails:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
railway up
```

**Database connection fails:**
- Ensure PostgreSQL addon is added
- Check `DATABASE_URL` is set correctly
- Verify Prisma schema matches database

**API not accessible:**
- Check Railway logs: `railway logs`
- Verify health endpoint: `/health`
- Confirm environment variables

### **View Logs:**
```bash
# Real-time logs
railway logs --follow

# Service-specific logs
railway logs --service backend
```

---

## 📞 **Support**

**Railway Documentation:** https://docs.railway.app  
**Railway Discord:** https://discord.gg/railway  
**Project Issues:** Create issue in your GitHub repo

---

**🎉 Congratulations! Your app is now running on Railway with full backend capabilities!**
