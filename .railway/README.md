# Railway Deployment Configuration

## Service Configuration
This project is configured for Railway deployment with the following setup:

### Build Process
- **Builder**: Nixpacks (auto-detected Node.js)
- **Build Command**: Automatically runs `npm install` and `npm run build`
- **Start Command**: `npm start` (runs backend server)

### Environment Variables Required
- `NODE_ENV=production`
- `DATABASE_URL` (provided by Railway PostgreSQL addon)
- `JWT_SECRET` (set in Railway dashboard)

### Deployment Triggers
- Pushes to `main` branch
- Changes to `backend/` directory
- Changes to `package.json`
- Changes to `nixpacks.toml`

### Health Checks
- Health endpoint: `/health`
- API health endpoint: `/api/health`
