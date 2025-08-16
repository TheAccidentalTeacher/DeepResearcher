# 🚂 Railway Deployment Instructions

This project has been configured for deployment on Railway. Follow these steps:

## Quick Deploy to Railway

### Prerequisites
- Railway account ([sign up here](https://railway.app))
- GitHub repository connected to Railway

### 1. Deploy via Railway Dashboard
1. Go to [Railway](https://railway.app) and create a new project
2. Connect your GitHub repository
3. Railway will automatically detect the `railway.json` configuration
4. Add a PostgreSQL database from the Railway dashboard
5. Set environment variables (see below)

### 2. Deploy via Railway CLI
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize and deploy
railway init
railway up
```

### 3. Environment Variables
Set these in your Railway project dashboard:

**Required:**
- `DATABASE_URL` (auto-provided by Railway PostgreSQL)
- `JWT_SECRET` (generate a secure random string)
- `NODE_ENV=production`

**Optional:**
- `OPENAI_API_KEY` (for AI research features)
- `REDIS_URL` (if using Redis addon)
- `FRONTEND_URL` (your frontend domain)

### 4. Database Setup
Railway will automatically provision PostgreSQL. The `DATABASE_URL` environment variable will be available in your app.

### 5. Access Your App
After deployment, your API will be available at:
- `https://your-app.railway.app/health` (health check)
- `https://your-app.railway.app/api/research` (research endpoint)

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev:backend

# Or build and start production
npm run build
npm start
```

## Project Structure

```
/backend/          # Express.js API server
  /src/
    /routes/       # API route handlers
    server.ts      # Main server file
/shared/           # Shared types and utilities
railway.json       # Railway deployment config
Procfile          # Process configuration
```

## API Documentation

### Health Check
```
GET /health
GET /api/health
```

### Research Endpoints
```
POST /api/research      # Start research session
GET /api/research       # List all sessions  
GET /api/research/:id   # Get specific session
```

For more details, see the main [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md).
